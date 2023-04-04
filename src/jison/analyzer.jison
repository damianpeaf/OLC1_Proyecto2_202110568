/**
    Proyecto 2 OLC1 - 202110568
*/

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
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")* { yytext = yytext.toLowerCase();  return ID; }

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
program : statements EOF
        | EOF
        ;

statements : normal_statement flow_control_statement
           | normal_statement
           | flow_control_statement
           ;

flow_control_statement : BREAK SEMICOLON
                       | CONTINUE SEMICOLON
                       | RETURN SEMICOLON
                       | RETURN expression SEMICOLON
                       ;

normal_statement : normal_statement statement
                 | statement
                 ;

statement : variable_declaration
          | variable_assignment
          | if
          | switch
          | while
          | for
          | do_while
          | subroutine_call
          | subroutine_declaration
          ;

type : INT
     | DOUBLE
     | STRING
     | BOOLEAN
     | CHAR
     ;


// TODO: Add support for arrays and vectors [DECLARATION]
// - Vectors -> reservation and element list
// - Arrays -> new 
variable_declaration : type ID SEMICOLON
                     | type ID EQUAL expression SEMICOLON
                     ;

// TODO: Casts
// TODO: Add support for arrays and vectors [ASSIGNMENT]
// - Vectors -> reservation and element list
// - Arrays -> new
variable_assignment : ID EQUAL expression SEMICOLON
                    | ID PLUS_PLUS SEMICOLON
                    | ID MINUS_MINUS SEMICOLON
                    ;

if : IF LPAREN expression RPAREN LBRACE statements RBRACE
   | IF LPAREN expression RPAREN LBRACE statements RBRACE if_chain
   ;

if_chain : ELSE LBRACE statements RBRACE
         | ELSE if
         ;

switch : SWITCH LPAREN expression RPAREN LBRACE switch_cases RBRACE
       ;

switch_cases : case_list
             | case_list default
             | default
             ;

case_list : case_list case
          | case
          ;

case : CASE expression COLON statements
     ;

default : DEFAULT COLON statements
        ;

while : WHILE LPAREN expression RPAREN LBRACE statements RBRACE
      ;

for : FOR LPAREN for_init SEMICOLON for_condition SEMICOLON for_update RPAREN LBRACE statements RBRACE
    ;

for_init : variable_declaration
         | variable_assignment
        //  | subroutine_call // ??????
         ;

for_condition : expression
              ;

for_update : variable_assignment
           // | subroutine_call // ??????
           ;

do_while : DO LBRACE statements RBRACE WHILE LPAREN expression RPAREN SEMICOLON
         ;

subroutine_call : ID LPAREN subroutine_call_params RPAREN SEMICOLON
                | ID LPAREN RPAREN SEMICOLON
                ;

subroutine_call_params : subroutine_call_params COMMA expression
                       | expression
                       ;

object_subroutine_call : ID DOT subroutine_call
                       ;


subroutine_declaration : method_declaration
                       | function_declaration
                       ;

method_declaration : VOID ID LPAREN RPAREN LBRACE statements RBRACE
                   | VOID ID LPAREN subroutine_declaration_params RPAREN LBRACE statements RBRACE
                   ;

function_declaration : type ID LPAREN RPAREN LBRACE statements RBRACE
                     | type ID LPAREN subroutine_declaration_params RPAREN LBRACE statements RBRACE
                     ;


subroutine_declaration_params : subroutine_declaration_params COMMA subroutine_declaration_param
                              | subroutine_declaration_param
                              ;

subroutine_declaration_param : type ID
                             ;

expression  : expression PLUS expression                           // a + b
            | expression MINUS expression                          // a - b
            | expression TIMES expression                          // a * b
            | expression DIVIDE expression                         // a / b
            | expression MOD expression                            // a % b 
            | expression POWER expression                          // a ^ b

            | MINUS expression %prec unary                         // -a
            | LPAREN expression RPAREN                             // (a)

            | expression EQUALS expression                         // a == b
            | expression NOT_EQUAL expression                      // a != b
            | expression LESS_THAN expression                      // a < b
            | expression LESS_THAN_OR_EQUAL expression             // a <= b
            | expression GREATER_THAN expression                   // a > b
            | expression GREATER_THAN_OR_EQUAL expression          // a >= b

            | expression AND expression                            // a && b
            | expression OR expression                             // a || b
            | NOT expression %prec unary                           // !a

            | expression INTERROGATION expression COLON expression // a ? b : c
            
            // LITERALS
            | INT_LITERAL                                          // 1
            | DOUBLE_LITERAL                                       // 1.0
            | STRING_LITERAL                                       // "Hello World"
            | BOOLEAN_LITERAL                                      // true
            | CHAR_LITERAL                                         // 'a'
            | TRUE                                                 // true
            | FALSE                                                // false

            // REFERENCES 
            | ID                                                   // a
            | ID PLUS_PLUS                                         // a++
            | ID MINUS_MINUS                                       // a--

            // SUBROUTINE CALLS
            | ID LPAREN subroutine_call_params RPAREN SEMICOLON    // a(b, c, d)
            | ID LPAREN RPAREN SEMICOLON                           // a()
            ;
// TODO: Add support for arrays and vectors [ACCESS]