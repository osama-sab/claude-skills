# Jargon glosses

Short glosses for software terms that come up in this project. Use the gloss on
first appearance in a session, then use the bare term — the goal is that he ends
up owning the vocabulary, not that he is protected from it.

Rule of thumb: if the term names a *thing he can point at in the repo*, gloss it
once. If it names a *culture or a habit*, gloss it every time, because those are
the ones that stay slippery.

## Contents

- [Testing](#testing)
- [Types and static checking](#types-and-static-checking)
- [Packaging and tooling](#packaging-and-tooling)
- [Git](#git)
- [CI](#ci)
- [Design vocabulary](#design-vocabulary)
- [Networking and I/O](#networking-and-io)
- [Terms to avoid entirely](#terms-to-avoid-entirely)

## Testing

| Term | Gloss |
|---|---|
| fixture | setup helper pytest runs before your test |
| parametrise | run one test over many inputs |
| assertion | a line that fails the test if false |
| mock / fake | stand-in object so you can test without hardware |
| regression test | test that pins a bug you already fixed |
| coverage | which lines the tests actually execute |
| flaky | passes and fails without the code changing |
| happy path | the run where nothing goes wrong |
| edge case | input at the boundary — empty, zero, maximum |
| smoke test | one cheap test that proves it is not dead |

## Types and static checking

| Term | Gloss |
|---|---|
| type hint | annotation saying what goes in and comes out |
| `mypy --strict` | checks those annotations without running the code |
| `Optional[X]` | an X, or nothing at all |
| union type | one of several allowed types |
| protocol | "anything with these methods fits here" |
| linter / `ruff` | flags style and likely-bug patterns automatically |

## Packaging and tooling

| Term | Gloss |
|---|---|
| `pyproject.toml` | one file declaring the package and its tools |
| editable install | installed but still edited in place |
| virtual environment | per-project Python with its own packages |
| entry point | the command name your package installs |
| dependency pin | fixing an exact version so builds repeat |

## Git

He is a beginner here. Gloss these every time for now.

| Term | Gloss |
|---|---|
| commit | a saved snapshot with a message |
| staging / `git add` | choosing what goes in the next snapshot |
| branch | a parallel line of commits |
| merge | folding one branch's commits into another |
| rebase | replaying your commits on top of newer ones |
| remote / origin | the copy on GitHub |
| push / pull | send to GitHub / fetch from GitHub |
| diff | the lines that changed |
| HEAD | the commit you are currently sitting on |

## CI

| Term | Gloss |
|---|---|
| CI | GitHub runs your tests on every push |
| workflow / job / step | the file, one machine's run, one command |
| runner | the throwaway machine GitHub gives you |
| matrix | same job repeated across Python versions |
| badge | the green or red marker on your README |

## Design vocabulary

These carry real content — gloss and keep using them, because they are the words
he will need in an interview.

| Term | Gloss |
|---|---|
| abstraction layer | code that hides one choice behind a stable interface |
| coupling | how much one part must know about another |
| separation of concerns | each part owns one job |
| state machine | thing with modes and rules for changing mode |
| idempotent | running it twice changes nothing extra |
| side effect | the function changes something outside itself |
| invariant | something that must be true at all times |
| leaky abstraction | the hidden detail shows through anyway |
| context manager | `with` block that cleans up on the way out |

## Networking and I/O

Half of these he already has from the instrument side — check before glossing,
and never gloss SCPI or IEEE 488.2 terms, which he knows better than the
software ones.

| Term | Gloss |
|---|---|
| blocking call | the program stops here until it gets an answer |
| timeout | how long before giving up and raising |
| buffer | bytes held until you have enough to use |
| terminator | the character marking the end of a message |
| framing | working out where one message stops |
| socket | the file-like handle on a TCP connection |
| graceful close | both sides agree the conversation is over |

## Terms to avoid entirely

Replace with the plain phrase — these buy nothing here.

| Avoid | Say instead |
|---|---|
| "blocking semantics" | "hangs until it gets an answer" |
| "RAII-style resource management" | "cleans itself up when the block ends" |
| "surface area" | "how much of it other code can touch" |
| "orthogonal" | "unrelated" |
| "composable" | "these can be combined without special cases" |
| "canonical" | "the normal way" |
| "non-trivial" | say what is actually hard about it |
| "robust" | say what it survives |
| "best practice" | say who does it and why |
| "clean code" | say what specifically reads badly |
