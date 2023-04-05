/**
    Proyecto 2 OLC1 - 202110568
*/

// --- Header ---

%{
    import { Builder } from '../ast';
    import { Type, Symbols, SubroutineType } from '../elements';
    import { VariableAssigmentType } from '../statements/variable';
    import { ArithmeticExpressionType,RelationalExpresionType,LogicalExpressionType } from '../statements/expression';
    import { ReferenceType } from '../statements/value';

%}

// --- Lexical specification ---

%lex

%options case-insensitive

%%

// --- Regular expressions ---

// * Comments

"//".*                                         {/* skip */} // Single line comment
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]            {/* skip */} // Multi line comment

// * Delimiters
\s+                         {/* skip */} // Whitespace

// * ID
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")* { yytext = yytext.toLowerCase();  return "ID"; }

// * Literals

\'([^\r\n'\\]|\\[btnfr"'\\]|\\[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4})\'      { yytext = yytext.substring(1, yytext.length()-2); return "CHAR_LITERAL"; }
\"(?:[["\\"]["bnrt/["\\"]]|[^"["\\"])*\"                               { yytext = yytext.substring(1, yytext.length()-2); return "STRING_LITERAL"; }
[0-9]+                                                                 { return "INT_LITERAL"; }
[0-9]+\.[0-9]+                                                         { return "DOUBLE_LITERAL"; }


// * Types
"int"                              { return "INT"; }
"double"                           { return "DOUBLE"; }
"boolean"                          { return "BOOLEAN"; }
"char"                             { return "CHAR"; }
"string"                           { return "STRING"; }

// * Operators

// * Arithmetic

"+"                               { return "PLUS"; }
"-"                               { return "MINUS"; }
"*"                               { return "TIMES"; }
"/"                               { return "DIVIDE"; }
"%"                               { return "MOD"; }

// * Relational

"=="                              { return "EQUALS"; }
"!="                              { return "NOT_EQUAL"; }
"<"                               { return "LESS_THAN"; }
"<="                              { return "LESS_THAN_OR_EQUAL"; }
">"                               { return "GREATER_THAN"; }
">="                              { return "GREATER_THAN_OR_EQUAL"; }

// * Ternary

"?"                               { return "INTERROGATION"; }
":"                               { return "COLON"; }

// * Logical

"&&"                              { return "AND"; }
"\|\|"                            { return "OR;" }
"!"                               { return "NOT"; }

// * Grouping

"("                               { return "LPAREN"; }
")"                               { return "RPAREN"; }

// * End of statement

";"                               { return "SEMICOLON"; }

// * Assignment

"="                               { return "EQUAL"; }

// * Increment/Decrement

"\+\+"                            { return "PLUS_PLUS"; }
"\-\-"                            { return "MINUS_MINUS"; }

// * Data structures operators

"["                               { return "LBRACKET"; }
"]"                               { return "RBRACKET"; }
"{"                               { return "LBRACE"; }
"}"                               { return "RBRACE"; }

// * Keywords

"if"                              { return "IF"; }  
"else"                            { return "ELSE"; }
"switch"                          { return "SWITCH"; }
"case"                            { return "CASE"; }
"default"                         { return "DEFAULT"; }
"while"                           { return "WHILE"; }
"for"                             { return "FOR"; }
"do"                              { return "DO"; }
"void"                            { return "VOID"; }
"true"                            { return "TRUE"; }
"false"                           { return "FALSE"; }
// TODO: MAIN

// * Flow control

"return"                          { return "RETURN"; }
"continue"                        { return "CONTINUE"; }
"break"                           { return "BREAK"; }

// * Others

","                               { return "COMMA"; }
"."                               { return "DOT"; }


<<EOF>>                            { return "EOF"; }
.                                 { return "ERROR"; }

/lex

// --- Precedence ---

%left INTERROGATION COLON // Ternary
%left OR, AND // Logical
%left NOT // NOT
%left EQUALS EQUALS, NOT_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL, GREATER_THAN, GREATER_THAN_OR_EQUAL // Relational
%left PLUS, MINUS // Arithmetic
%left TIMES, DIVIDE, MOD // Arithmetic
%nonassoc POWER // Power
%right LPAREN
%right PLUS_PLUS, MINUS_MINUS // Increment/Decrement
%left unary // Unarys

// --- Grammar ---

%start program

%%

// TODO: MAIN
program : statements 
            {
                $$ = Builder.node.root({
                    stmts: $1
                });
            }
        ;

statements : normal_statements flow_control_statement
                {
                    $1.push($2);
                    $$ = $1;
                }
           | normal_statements
                {
                    $$ = $1;
                }
           | flow_control_statement
                {
                    $$ = [$1];
                }
            | /* empty */
                {
                    $$ = [];
                }
            | EOF 
                {
                    $$ = [];
                }
           ;

flow_control_statement : BREAK SEMICOLON
                            {
                                $$ = Builder.node.break({
                                    line: @1.first_line,
                                    column: @1.first_column
                                });
                            }
                       | CONTINUE SEMICOLON
                            {
                                $$ = Builder.node.continue({
                                    line: @1.first_line,
                                    column: @1.first_column
                                });
                            }
                       | RETURN SEMICOLON
                            {
                                $$ = Builder.node.return({
                                    line: @1.first_line,
                                    column: @1.first_column
                                });
                            }
                       | RETURN expression SEMICOLON
                            {
                                $$ = Builder.node.return({
                                    line: @1.first_line,
                                    column: @1.first_column,
                                    value: $2
                                });
                            }
                       ;

normal_statements : normal_statements statement
                        {
                            $1.push($2);
                            $$ = $1;
                        }
                 | statement
                        {
                            $$ = [$1];
                        }
                 ;

statement : variable_declaration    { $$ = $1; }
          | variable_assignment     { $$ = $1; }
          | if                      { $$ = $1; }
          | switch                  { $$ = $1; }
          | while                   { $$ = $1; }
          | for                     { $$ = $1; }
          | do_while                { $$ = $1; }
          | subroutine_call         { $$ = $1; }
          | subroutine_declaration  { $$ = $1; }
          ;

type : INT      { $$ = Type.INT; }
     | DOUBLE   { $$ = Type.DOUBLE; }
     | STRING   { $$ = Type.STRING; }
     | BOOLEAN  { $$ = Type.BOOLEAN; }
     | CHAR     { $$ = Type.CHAR; }
     ;


// TODO: Add support for arrays and vectors [DECLARATION]
// - Vectors -> reservation and element list
// - Arrays -> new 
variable_declaration : type ID SEMICOLON
                        {
                            $$ = Builder.node.variableDcl({
                                line: @1.first_line,
                                column: @1.first_column,
                                type: $1,
                                name: $2
                            });
                        }
                     | type ID EQUAL expression SEMICOLON
                        {
                            $$ = Builder.node.variableDcl({
                                line: @1.first_line,
                                column: @1.first_column,
                                type: $1,
                                name: $2,
                                value: $4
                            });
                        }
                     ;

// TODO: Casts
// TODO: Add support for arrays and vectors [ASSIGNMENT]
// - Vectors -> reservation and element list
// - Arrays -> new
variable_assignment : ID EQUAL expression SEMICOLON
                        {
                            $$ = Builder.node.variableAss({
                                line: @1.first_line,
                                column: @1.first_column,
                                name: $1,
                                value: $3,
                                type: VariableAssigmentType.DIRECT
                            });
                        }
                    | ID PLUS_PLUS SEMICOLON
                        {
                            $$ = Builder.node.variableAss({
                                line: @1.first_line,
                                column: @1.first_column,
                                name: $1,
                                type: VariableAssigmentType.INCREMENT
                            });
                        }
                    | ID MINUS_MINUS SEMICOLON
                        {
                            $$ = Builder.node.variableAss({
                                line: @1.first_line,
                                column: @1.first_column,
                                name: $1,
                                type: VariableAssigmentType.DECREMENT
                            });
                        }
                    ;

if : IF LPAREN expression RPAREN LBRACE statements RBRACE
        {
            $$ = Builder.node.if({
                line: @1.first_line,
                column: @1.first_column,
                condition: $3,
                statements: $6,
                chain: []
            });
        }
   | IF LPAREN expression RPAREN LBRACE statements RBRACE if_chain
        {
            $$ = Builder.node.if({
                line: @1.first_line,
                column: @1.first_column,
                condition: $3,
                statements: $6,
                chain: $7
            });
        }
   ;

if_chain : elseif_chain else
            {
                $$ = $1;
                $$.push($2);
            }
         | ELSE LBRACE statements RBRACE
            {
                $$ = [$1];
            }
         ;

else : ELSE LBRACE statements RBRACE
        {
            return Builder.node.else({
                line: @1.first_line,
                column: @1.first_column,
                statements: $3
            });
        }
     ;

elseif_chain : elseif_chain elseif
                {
                    $1.push($2);
                    $$ = $1;
                }
             | elseif
                {
                    $$ = [$1];
                }
             ;

elseif : ELSE IF LPAREN expression RPAREN LBRACE statements RBRACE
            {
                $$ = Builder.node.elseIf({
                    line: @1.first_line,
                    column: @1.first_column,
                    condition: $4,
                    statements: $7
                });
            }
        ;

switch : SWITCH LPAREN expression RPAREN LBRACE switch_cases RBRACE
            {
                $$ = Builder.node.switch({
                    line: @1.first_line,
                    column: @1.first_column,
                    value: $3,
                    cases: $6
                });
            }
       ;

switch_cases : case_list
                {
                    $$ = $1;
                }
             | case_list default
                {
                    $1.push($2);
                    $$ = $1;
                }
             | default
                {
                    $$ = [$1];
                }
             ;

case_list : case_list case
            {
                $1.push($2);
                $$ = $1;
            }
          | case
            {
                $$ = [$1];
            }
          ;

case : CASE expression COLON statements
        {
            $$ = Builder.node.case({
                line: @1.first_line,
                column: @1.first_column,
                condition: $2,
                statements: $4
            });
        }
     ;

default : DEFAULT COLON statements
            {
                $$ = Builder.node.default({
                    line: @1.first_line,
                    column: @1.first_column,
                    statements: $3
                });
            }
        ;

while : WHILE LPAREN expression RPAREN LBRACE statements RBRACE
        {
            $$ = Builder.node.while({
                line: @1.first_line,
                column: @1.first_column,
                condition: $3,
                statements: $6
            });
        }
      ;

for : FOR LPAREN for_init SEMICOLON for_condition SEMICOLON for_update RPAREN LBRACE statements RBRACE
        {
            $$ = Builder.node.for({
                line: @1.first_line,
                column: @1.first_column,
                init: $3,
                condition: $5,
                update: $7,
                statements: $10
            });
        }
    ;

for_init : variable_declaration { $$ = $1; }
         | variable_assignment { $$ = $1; }
        //  | subroutine_call // ??????
         ;

for_condition : expression { $$ = $1; }
              ;

for_update : variable_assignment { $$ = $1; }
           // | subroutine_call // ??????
           ;

do_while : DO LBRACE statements RBRACE WHILE LPAREN expression RPAREN SEMICOLON
            {
                $$ = Builder.node.doWhile({
                    line: @1.first_line,
                    column: @1.first_column,
                    condition: $7,
                    statements: $3
                });
            }
         ;

subroutine_call : subroutine_call_aux SEMICOLON { $$ = $1; }
                ;

subroutine_call_aux : ID LPAREN subroutine_call_params RPAREN
                        {
                            $$ = Builder.node.subroutineCall({
                                line: @1.first_line,
                                column: @1.first_column,
                                name: $1,
                                args: $3
                            });
                        }
                    | ID LPAREN RPAREN
                        {
                            $$ = Builder.node.subroutineCall({
                                line: @1.first_line,
                                column: @1.first_column,
                                name: $1,
                                args: []
                            });
                        }
                    ;

subroutine_call_params : subroutine_call_params COMMA expression
                            {
                                $1.push($3);
                                $$ = $1;
                            }
                       | expression
                            {
                                $$ = [$1];
                            }
                       ;

object_subroutine_call : ID DOT subroutine_call
                        // TODO: Not implemented AST node
                       ;


subroutine_declaration : method_declaration     { $$ = $1; }
                       | function_declaration   { $$ = $1; }
                       ;

method_declaration : VOID ID LPAREN RPAREN LBRACE statements RBRACE
                        {
                            $$ = Builder.node.subroutineDcl({
                                line: @1.first_line,
                                column: @1.first_column,
                                name: $2,
                                args: [],
                                statements: $6,
                                type: SubroutineType.METHOD,
                                returnType: Symbols.VOID
                            });
                        }
                   | VOID ID LPAREN subroutine_declaration_params RPAREN LBRACE statements RBRACE
                        {
                            $$ = Builder.node.subroutineDcl({
                                line: @1.first_line,
                                column: @1.first_column,
                                name: $2,
                                args: $4,
                                statements: $7,
                                type: SubroutineType.METHOD,
                                returnType: Symbols.VOID
                            });
                        }
                   ;

function_declaration : type ID LPAREN RPAREN LBRACE statements RBRACE
                        {
                            $$ = Builder.node.subroutineDcl({
                                line: @1.first_line,
                                column: @1.first_column,
                                name: $2,
                                args: [],
                                statements: $6,
                                type: SubroutineType.FUNCTION,
                                returnType: $1
                            });
                        }
                     | type ID LPAREN subroutine_declaration_params RPAREN LBRACE statements RBRACE
                        {
                            $$ = Builder.node.subroutineDcl({
                                line: @1.first_line,
                                column: @1.first_column,
                                name: $2,
                                args: $4,
                                statements: $7,
                                type: SubroutineType.FUNCTION,
                                returnType: $1
                            });
                        }
                     ;


subroutine_declaration_params : subroutine_declaration_params COMMA subroutine_declaration_param
                                {
                                    $1.push($3);
                                    $$ = $1;
                                }
                              | subroutine_declaration_param
                                {
                                    $$ = [$1];
                                }
                              ;

subroutine_declaration_param : type ID
                                {
                                    $$ = Builder.node.argument({
                                        line: @1.first_line,
                                        column: @1.first_column,
                                        type: $1,
                                        name: $2
                                    });
                                }
                             ;

expression  : expression PLUS expression                           // a + b
                {
                    $$ = Builder.node.arithmeticExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: ArithmeticExpressionType.PLUS,
                        left: $1,
                        right: $3
                    });
                }
            | expression MINUS expression                          // a - b
                {
                    $$ = Builder.node.arithmeticExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: ArithmeticExpressionType.MINUS,
                        left: $1,
                        right: $3
                    });
                }
            | expression TIMES expression                          // a * b
                {
                    $$ = Builder.node.arithmeticExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: ArithmeticExpressionType.TIMES,
                        left: $1,
                        right: $3
                    });
                }
            | expression DIVIDE expression                         // a / b
                {
                    $$ = Builder.node.arithmeticExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: ArithmeticExpressionType.DIVIDE,
                        left: $1,
                        right: $3
                    });
                }
            | expression MOD expression                            // a % b 
                {
                    $$ = Builder.node.arithmeticExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: ArithmeticExpressionType.MOD,
                        left: $1,
                        right: $3
                    });
                }
            | expression POWER expression                          // a ^ b
                {
                    $$ = Builder.node.arithmeticExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: ArithmeticExpressionType.POWER,
                        left: $1,
                        right: $3
                    });
                }

            | MINUS expression %prec unary                         // -a
                {
                    $$ = Builder.node.unaryMinusExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operand: $2
                    });
                }
            | LPAREN expression RPAREN                             // (a)
                {
                    $$ = $2;
                }

            | expression EQUALS expression                         // a == b
                {
                    $$ = Builder.node.relationalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: RelationalExpresionType.EQUALS,
                        left: $1,
                        right: $3
                    });
                }
            | expression NOT_EQUAL expression                      // a != b
                {
                    $$ = Builder.node.relationalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: RelationalExpresionType.NOT_EQUAL,
                        left: $1,
                        right: $3
                    });
                }
            | expression LESS_THAN expression                      // a < b
                {
                    $$ = Builder.node.relationalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: RelationalExpresionType.LESS_THAN,
                        left: $1,
                        right: $3
                    });
                }
            | expression LESS_THAN_OR_EQUAL expression             // a <= b
                {
                    $$ = Builder.node.relationalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: RelationalExpresionType.LESS_THAN_OR_EQUAL,
                        left: $1,
                        right: $3
                    });
                }
            | expression GREATER_THAN expression                   // a > b
                {
                    $$ = Builder.node.relationalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: RelationalExpresionType.GREATER_THAN,
                        left: $1,
                        right: $3
                    });
                }
            | expression GREATER_THAN_OR_EQUAL expression          // a >= b
                {
                    $$ = Builder.node.relationalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: RelationalExpresionType.GREATER_THAN_OR_EQUAL,
                        left: $1,
                        right: $3
                    });
                }

            | expression AND expression                            // a && b
                {
                    $$ = Builder.node.logicalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: LogicalExpressionType.AND,
                        left: $1,
                        right: $3
                    });
                }
            | expression OR expression                             // a || b
                {
                    $$ = Builder.node.logicalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        operator: LogicalExpressionType.OR,
                        left: $1,
                        right: $3
                    });
                }

            | NOT expression %prec unary                           // !a
                {
                    $$ = Builder.node.unaryNotExp({
                        line: @1.first_line,
                       column: @1.first_column,
                        operand: $2
                    });
                }

            | expression INTERROGATION expression COLON expression // a ? b : c
                {
                    $$ = Builder.node.ternaryExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        condition: $1,
                        trueExpression: $3,
                        falseExpression: $5
                    });
                }
            
            // LITERALS
            | INT_LITERAL                                          // 1
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.literal({
                            line: @1.first_line,
                            column: @1.first_column,
                            type: Type.INT,
                            value: $1
                        })
                    });
                }
            | DOUBLE_LITERAL                                       // 1.0
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.literal({
                            line: @1.first_line,
                            column: @1.first_column,
                            type: Type.DOUBLE,
                            value: $1
                        })
                    });
                }
            | STRING_LITERAL                                       // "Hello World"
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.literal({
                            line: @1.first_line,
                            column: @1.first_column,
                            type: Type.STRING,
                            value: $1
                        })
                    });
                }
            | BOOLEAN_LITERAL                                      // true
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.literal({
                            line: @1.first_line,
                            column: @1.first_column,
                            type: Type.BOOLEAN,
                            value: $1
                        })
                    });
                }
            | CHAR_LITERAL                                         // 'a'
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.literal({
                            line: @1.first_line,
                            column: @1.first_column,
                            type: Type.CHAR,
                            value: $1
                        })
                    });
                }
            | TRUE                                                 // true
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.literal({
                            line: @1.first_line,
                            column: @1.first_column,
                            type: Type.BOOLEAN,
                            value: $1
                        })
                    });
                }
            | FALSE                                                // false
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.literal({
                            line: @1.first_line,
                            column: @1.first_column,
                            type: Type.BOOLEAN,
                            value: $1
                        })
                    });
                }

            // REFERENCES 
            | ID                                                   // a
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.reference({
                            line: @1.first_line,
                            column: @1.first_column,
                            name: $1,
                            type: ReferenceType.DIRECT
                        })
                    });
                }
            | ID PLUS_PLUS                                         // a++
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.reference({
                            line: @1.first_line,
                            column: @1.first_column,
                            name: $1,
                            type: ReferenceType.INCREMENT
                        })
                    });
                }
            | ID MINUS_MINUS                                       // a--
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.reference({
                            line: @1.first_line,
                            column: @1.first_column,
                            name: $1,
                            type: ReferenceType.DECREMENT
                        })
                    });
                }

            // SUBROUTINE CALLS
            | subroutine_call_aux 
                {
                    $$ = Builder.node.terminalExp({
                        line: @1.first_line,
                        column: @1.first_column,
                        value: Builder.node.call({
                            line: @1.first_line,
                            column: @1.first_column,
                            call: $1
                        })
                    });
                }
            ;
