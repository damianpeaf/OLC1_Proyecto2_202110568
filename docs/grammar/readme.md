

# Tokens and Regex

### Comments

* `"//".*`    -> SINGLE LINE COMMENT <br>
* `[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]`  -> MULTI LINE COMMENT <br>


### Identifiers
`([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*` -> ID

### Literals
* `\'([^\r\n'\\]|\\[btnfr"'\\]|\\[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4})\' `-> CHAR_LITERAL <br>
* `/^"(\\.|[^"\\])*"$/                                               `-> STRING_LITERAL <br>
* `[0-9]+                                                            `-> INT_LITERAL <br>
* `[0-9]+[.][0-9]+                                                   `-> DOUBLE_LITERAL <br>

### Types

* `"int"`     -> INT <br>
* `"double"`  -> DOUBLE <br>
* `"string"`  -> STRING <br>
* `"boolean"` -> BOOLEAN <br>
* `"char"`    -> CHAR <br>

### Operators

#### Arithmetic Operators

* `"+"` -> PLUS <br>
* `"-"` -> MINUS <br>
* `"*"` -> TIMES <br>
* `"/"` -> DIVIDE <br>
* `"^"` -> POWER <br>
* `"%"` -> MOD <br>

#### Relational Operators

* `"=="` -> EQUALS <br>
* `"!="` -> NOT_EQUAL <br>
* `"<"`  -> LESS_THAN <br>
* `"<="` -> LESS_THAN_OR_EQUAL <br>
* `">"`  -> GREATER_THAN <br>
* `">="` -> GREATER_THAN_OR_EQUAL <br>

##### Ternary Operator

* `"?"` -> INTERROGATION <br>
* `":"` -> COLON <br>

#### Logical Operators

`* `"&&"` -> AND <br>
`* `"\|\|"` -> OR <br>
`* `"!"` -> NOT <br>

#### Grouping Operators

`"("` -> LPAREN <br>
`")"` -> RPAREN <br>

#### End of Statement

`";"` -> SEMICOLON <br>

#### Assignment Operators

`"="` -> EQUAL <br>

#### Increment and Decrement Operators

`"++"` -> PLUS_PLUS <br>
`"--"` -> MINUS_MINUS <br>

#### Data Structure Operators

`"["` -> LBRACKET <br>
`"]"` -> RBRACKET <br>
`"{"` -> LBRACE <br>
`"}"` -> RBRACE <br>

#### Keywords

`"if"` -> IF <br>
`"else"` -> ELSE <br>
`"switch"` -> SWITCH <br>
`"case"` -> CASE <br>
`"default"` -> DEFAULT <br>
`"while"` -> WHILE <br>
`"for"` -> FOR <br>
`"do"` -> DO <br>
`"void"` -> VOID <br>
`"true"` -> TRUE <br>
`"false"` -> FALSE <br>

#### Flow Control

`"break"` -> BREAK <br>
`"continue"` -> CONTINUE <br>
`"return"` -> RETURN <br>

#### Other Operators

`","` -> COMMA <br>
`"."` -> DOT <br>


# Precedence

In ascending order of precedence:

1. Unary Not `[-]` Right Associative
1. Increment `[++]` Right Associative
1. Decrement `[--]` Right Associative
2. Parentheses `[ ( ) ]` Left Associative
3. Power `[^]` Non Associative
4. Multiplication `[*]` Left Associative
4. Division `[/]` Left Associative
4. Modulus `[%]` Left Associative
5. Addition `[+]` Left Associative
5. Subtraction `[-]` Left Associative
6. Relational Operators `[==, !=, <, <=, >, >=]` Left Associative
7. Not `[!]` Right Associative
8. And `[&&]` Left Associative
8. Or `[||]` Left Associative
9. Ternary `[?:]` Left Associative


# Grammar

- Program start
```
Program    -> Statements EOF
            |  EOF
``` 

- Statements
```
Statements -> NormalStatement FlowControl
            |  NormalStatement
            |  FlowControl 
```

- Normal Statements
```
NormalStatement -> NormalStatement Statement
                 | Statement
```

- Flow Control statements
```
FlowControl -> BREAK SEMICOLON
             | CONTINUE SEMICOLON
             | RETURN SEMICOLON
             | RETURN Expression SEMICOLON
```

- Posible statements
```
Statement -> Declaration
           | Assignment
           | If
           | Switch
           | While
           | For
           | Do
           | SubroutineCall
           | SubroutineDeclaration
```
          
- Types
```
Type -> INT
      | DOUBLE
      | STRING
      | BOOLEAN
      | CHAR
```

- Variable declaration
```
Declaration -> Type ID SEMICOLON
             | Type ID EQUAL Expression SEMICOLON
```

- Variable assignment
```
Assignment -> ID EQUAL Expression SEMICOLON
            | ID PLUS_PLUS SEMICOLON
            | ID MINUS_MINUS SEMICOLON
```

- If statement
```
If -> IF LPAREN Expression RPAREN LBRACE Statements RBRACE
    | IF LPAREN Expression RPAREN LBRACE Statements RBRACE IfChain
```

- If chain (else, else if)
```
IfChain -> ELSE LBRACE Statements RBRACE
         | ELSE IF LPAREN Expression RPAREN LBRACE Statements RBRACE IfChain
```

- Switch statement
```
Switch -> SWITCH LPAREN Expression RPAREN LBRACE Cases RBRACE
```

- Switch body
```
Cases -> CasesList 
       | CasesList Default
```

- Cases list
```
CasesList -> CasesList Case
           | Case
```

- Case
```
Case -> CASE Expression COLON Statements
```

- While statement
```
While -> WHILE LPAREN Expression RPAREN LBRACE Statements RBRACE
```

- For statement
```
For -> FOR LPAREN ForInit SEMICOLON ForCondition SEMICOLON ForUpdate RPAREN LBRACE Statements RBRACE
```

- For, init statement
```
ForInit -> Declaration
         | Assignment
         | SubroutineCall ???
```

- For condition statement
```
ForCondition -> Expression
```

- For update statement
```
ForUpdate -> Assignment
```

- DoWhile statement
```
Do -> DO LBRACE Statements RBRACE WHILE LPAREN Expression RPAREN SEMICOLON
```

- Subroutine call
```
SubroutineCall -> ID LPAREN RPAREN SEMICOLON
                | ID LPAREN Arguments RPAREN SEMICOLON
```

- Object subroutine call
```
ObjectSubroutineCall -> ID DOT SubroutineCall // !!!
```

- Arguments of subroutine call
```
Arguments -> Expression
           | Arguments COMMA Expression
```


- Subroutine declaration
```
SubroutineDeclaration -> MethodDeclaration
                       | FunctionDeclaration
```

- Method declaration
```
MethodDeclaration -> VOID ID LPAREN RPAREN LBRACE Statements RBRACE
                   | VOID ID LPAREN SubroutineArguments RPAREN LBRACE Statements RBRACE
```

- Function declaration
```
FunctionDeclaration -> Type ID LPAREN RPAREN LBRACE Statements RBRACE
                     | Type ID LPAREN SubroutineArguments RPAREN LBRACE Statements RBRACE
```

- Arguments of subroutine declaration
```
SubroutineArguments -> Type ID
                     | FunctionArguments COMMA Type ID
```

- Expression
```
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
```

