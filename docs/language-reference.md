

# Tokens and Regex

### Comments

"//".*    -> SINGLE LINE COMMENT
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  -> MULTI LINE COMMENT


### Identifiers
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")* -> ID

### Literals
\'([^\r\n'\\]|\\[btnfr"'\\]|\\[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4})\' -> CHAR_LITERAL
/^"(\\.|[^"\\])*"$/                                               -> STRING_LITERAL
[0-9]+                                                            -> INT_LITERAL
[0-9]+[.][0-9]+                                                   -> DOUBLE_LITERAL

### Types

"int"     -> INT
"double"  -> DOUBLE
"string"  -> STRING
"boolean" -> BOOLEAN
"char"    -> CHAR

### Operators

#### Arithmetic Operators

"+" -> PLUS
"-" -> MINUS
"*" -> TIMES
"/" -> DIVIDE
"^" -> POWER
"%" -> MOD

#### Relational Operators

"==" -> EQUALS
"!=" -> NOT_EQUAL
"<"  -> LESS_THAN
"<=" -> LESS_THAN_OR_EQUAL
">"  -> GREATER_THAN
">=" -> GREATER_THAN_OR_EQUAL

##### Ternary Operator

"?" -> INTERROGATION
":" -> COLON

#### Logical Operators

"&&" -> AND
"\|\|" -> OR
"!" -> NOT

#### Grouping Operators

"(" -> LPAREN
")" -> RPAREN

#### End of Statement

";" -> SEMICOLON

#### Assignment Operators

"=" -> EQUAL

#### Increment and Decrement Operators

"++" -> PLUS_PLUS
"--" -> MINUS_MINUS

#### Data Structure Operators

"[" -> LBRACKET
"]" -> RBRACKET
"{" -> LBRACE
"}" -> RBRACE

#### Keywords

"if" -> IF
"else" -> ELSE
"switch" -> SWITCH
"case" -> CASE
"default" -> DEFAULT
"while" -> WHILE
"for" -> FOR
"do" -> DO
"void" -> VOID
"true" -> TRUE
"false" -> FALSE

#### Flow Control

"break" -> BREAK
"continue" -> CONTINUE
"return" -> RETURN

#### Other Operators

"," -> COMMA
"." -> DOT


# Precedence

In ascending order of precedence:

1. Unary Not [-] Right Associative
1. Increment [++] Right Associative
1. Decrement [--] Right Associative
2. Parentheses [ ( ) ] Left Associative
3. Power [^] Non Associative
4. Multiplication [*] Left Associative
4. Division [/] Left Associative
4. Modulus [%] Left Associative
5. Addition [+] Left Associative
5. Subtraction [-] Left Associative
6. Relational Operators [==, !=, <, <=, >, >=] Left Associative
7. Not [!] Right Associative
8. And [&&] Left Associative
8. Or [||] Left Associative
9. Ternary [?:] Left Associative


# Grammar

Program    -> Statements EOF
            |  EOF


Statements -> NormalStatement FlowControl
            |  NormalStatement
            |  FlowControl 

NormalStatement -> NormalStatement Statement
                 | Statement

FlowControl -> BREAK SEMICOLON
             | CONTINUE SEMICOLON
             | RETURN SEMICOLON
             | RETURN Expression SEMICOLON

Statement -> Declaration
           | Assignment
           | If
           | Switch
           | While
           | For
           | Do
           | SubroutineCall
           | SubroutineDeclaration
           

Type -> INT
      | DOUBLE
      | STRING
      | BOOLEAN
      | CHAR

Declaration -> Type ID SEMICOLON
             | Type ID EQUAL Expression SEMICOLON

Assignment -> ID EQUAL Expression SEMICOLON
            | ID PLUS_PLUS SEMICOLON
            | ID MINUS_MINUS SEMICOLON

If -> IF LPAREN Expression RPAREN LBRACE Statements RBRACE
    | IF LPAREN Expression RPAREN LBRACE Statements RBRACE IfChain

IfChain -> ELSE LBRACE Statements RBRACE
         | ELSE IF LPAREN Expression RPAREN LBRACE Statements RBRACE IfChain

Switch -> SWITCH LPAREN Expression RPAREN LBRACE Cases RBRACE

Cases -> CasesList 
       | CasesList Default

CasesList -> CasesList Case
           | Case

Case -> CASE Expression COLON Statements

While -> WHILE LPAREN Expression RPAREN LBRACE Statements RBRACE

For -> FOR LPAREN ForInit SEMICOLON ForCondition SEMICOLON ForUpdate RPAREN LBRACE Statements RBRACE

ForInit -> Declaration
         | Assignment
         | SubroutineCall ???

ForCondition -> Expression

ForUpdate -> Assignment

Do -> DO LBRACE Statements RBRACE WHILE LPAREN Expression RPAREN SEMICOLON

SubroutineCall -> ID LPAREN RPAREN SEMICOLON
                | ID LPAREN Arguments RPAREN SEMICOLON

ObjectSubroutineCall -> ID DOT SubroutineCall // !!!

Arguments -> Expression
           | Arguments COMMA Expression


SubroutineDeclaration -> MethodDeclaration
                       | FunctionDeclaration

MethodDeclaration -> VOID ID LPAREN RPAREN LBRACE Statements RBRACE
                   | VOID ID LPAREN SubroutineArguments RPAREN LBRACE Statements RBRACE

FunctionDeclaration -> Type ID LPAREN RPAREN LBRACE Statements RBRACE
                     | Type ID LPAREN SubroutineArguments RPAREN LBRACE Statements RBRACE


SubroutineArguments -> Type ID
                     | FunctionArguments COMMA Type ID


Expression -> Expression PLUS Expression
            | Expression MINUS Expression
            | Expression TIMES Expression
            | Expression DIVIDE Expression
            | Expression POWER Expression
            | Expression MOD Expression
            | MINUS Expression               PREC: UNARY_OPERATOR
            | LPAREN Expression RPAREN
            | Expression EQUALS Expression
            | Expression NOT_EQUAL Expression
            | Expression LESS_THAN Expression
            | Expression LESS_THAN_OR_EQUAL Expression
            | Expression GREATER_THAN Expression
            | Expression GREATER_THAN_OR_EQUAL Expression
            | Expression AND Expression
            | Expression OR Expression
            | NOT Expression
            | Expression INTERROGATION Expression COLON Expression PREC: TERNARY_OPERATOR
            | ID
            | INT_LITERAL
            | DOUBLE_LITERAL
            | STRING_LITERAL
            | CHAR_LITERAL
            | TRUE
            | FALSE
            | ID PLUS_PLUS
            | ID MINUS_MINUS

