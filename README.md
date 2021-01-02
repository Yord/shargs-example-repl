![pxi teaser][teaser]

shargs-example-repl is a sample application of [shargs][shargs] 🦈.

See the [`shargs` github repository][shargs] for more details!

[![node version][shield-node]][node]
[![license][shield-license]][license]
[![PRs Welcome][shield-prs]][contribute]

## Setup

```bash
$ git clone https://github.com/Yord/shargs-example-repl.git
$ cd shargs-example-repl
$ npm i
$ chmod +x ./repl
```

## Example

This repository is a simple example of a program using the [shargs][shargs] command-line parser.
The program can be found in the [`repl`][repl] script.

## Run the Example

Start the repl with:

```bash
$ ./repl
```

### Help

If you type `help`, the following output is shown:

```bash
help                       Print usage documentation.                           
echo                       Echos a string.                                      
    <text>                 This text is echoed.                                 
case                       Transforms its argument into upper or lower case     
                           depending on the --mode.                             
    <text>                 This text is transformed into upper or lower case.   
    --mode=<upper|lower>   How to transform the text.                           
```

If you type `help case`, only the case usage documentation is printed:

```bash
case [<text>] [--mode]                                                          
                                                                                
<text>                                                                          
    This text is transformed into upper or lower case.                          
--mode=<upper|lower>                                                            
    How to transform the text.                                                  
                                                                                
Transforms its argument into upper or lower case depending on the --mode.       
```

You may even print usage documentation for several commands with `help echo case`:

```bash
echo [<text>]                                                                   
                                                                                
<text>                                                                          
    This text is echoed.                                                        
                                                                                
Echos a string.                                                                 

case [<text>] [--mode]                                                          
                                                                                
<text>                                                                          
    This text is transformed into upper or lower case.                          
--mode=<upper|lower>                                                            
    How to transform the text.                                                  
                                                                                
Transforms its argument into upper or lower case depending on the --mode.       
```

### Executing Commands

Commands are executed as expected.
E.g. `case 'Foo Bar' --mode upper` prints:

```bash
FOO BAR
```

While `case 'Foo Bar' --mode lower` prints:

```bash
foo bar
```

### Error Messages

Error messages from the parser are printed in the REPL.
E.g. if you use an unknown `--mode` in `case`, like in `case 'Foo Bar' --mode camel`:

```bash
ValueRestrictionsViolated: A value lies outside the allowed values of an option.

Foo Bar
```

## Reporting Issues

Please report issues [in the `shargs` tracker][issues]!

## License

`shargs-example-repl` is [MIT licensed][license].



[contribute]: https://github.com/Yord/shargs#contributing
[issues]: https://github.com/Yord/shargs/issues
[license]: https://github.com/Yord/shargs-example-repl/blob/master/LICENSE
[node]: https://nodejs.org/
[repl]: https://github.com/Yord/shargs-example-repl/blob/master/repl
[shargs]: https://github.com/Yord/shargs
[shield-license]: https://img.shields.io/badge/license-MIT-yellow.svg?labelColor=313A42
[shield-node]: https://img.shields.io/node/v/shargs?color=red&labelColor=313A42
[shield-prs]: https://img.shields.io/badge/PRs-welcome-green.svg?labelColor=313A42
[teaser]: https://github.com/Yord/shargs-example-repl/blob/master/teaser.gif?raw=true