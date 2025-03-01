# Looping arrays

## Initial setup

```
function repeatLoop(times) {
    if (times <= 0) {
        return 'A'
    }

    const letters = []

    for (let x = 0; x < ImageBoard.length; x++) {
        for (let y = 0; y < ImageBoard[x].length; y++) {
            letters.push([ImageBoard[x][y], repeatLoop(times - 1)])
        }
    }

    return letters
}

function repeatLoop2(times) {
    if (times <= 0) {
        return 'A'
    }

    const letters = []

    for (let x of ImageBoard) {
        for (let y of x) {
            letters.push([y, repeatLoop2(times - 1)])
        }
    }

    return letters
}

function repeatLoop3(times) {
    if (times <= 0) {
        return 'A'
    }

    const letters = []

    ImageBoard.forEach((x) => {
        x.forEach((y) => {
            letters.push([y, repeatLoop3(times - 1)])
        })
    })

    return letters
}
```


### Time analysis
<hr />

| 1          | For     | For Of  | ForEach |
|:----------:|:-------:|:-------:|:-------:|
| Total time | 16.748  | 15.233  | 15.474  |
| Maximum    | 0.833   | 0.675   | 0.571   |
| Minimum    | 0.201   | 0.194   | 0.202   |
| Average    | 0.33496 | 0.30466 | 0.30948 |

<hr />

| 2          | For    | For Of  | ForEach |
|:----------:|:------:|:-------:|:-------:|
| Total time | 18.27  | 17.112  | 16.373  |
| Maximum    | 0.776  | 0.89    | 0.575   |
| Minimum    | 0.204  | 0.196   | 0.207   |
| Average    | 0.3654 | 0.34224 | 0.32746 |

<hr />

| 3          | For    | For Of  | ForEach |
|:----------:|:------:|:-------:|:-------:|
| Total time | 19.36  | 20.053  | 18.289  |
| Maximum    | 0.937  | 0.977   | 0.694   |
| Minimum    | 0.203  | 0.195   | 0.205   |
| Average    | 0.3872 | 0.40106 | 0.36578 |

<hr />

| 4          | For     | For Of | ForEach |
|:----------:|:-------:|:------:|:-------:|
| Total time | 18.038  | 20.135 | 17.758  |
| Maximum    | 0.977   | 0.905  | 0.84    |
| Minimum    | 0.203   | 0.194  | 0.203   |
| Average    | 0.36076 | 0.4027 | 0.35516 |

<hr />

### Conclusion

If we look at the minimum, maximum and average times, the diference in time between the diferent types of looping, is so small. For now, it's better if I leave the code as it is right now.


# Setting random values

## New setup

```
Inside the loop do this:
loop (for, for of, foreach) {
    let a = 'NEW REPLACEMENT'
    a = 'O NOOOOOOOO'
    a = 'YEEEEEEEEE'
    a = 'LAG CREATORRRRRRRRRR'
    a = 'LA LE LI LO LU'
    a = 'PIM PAM PUM'
}
```


### Time analysis
<hr />

| 1          | For     | For Of  | ForEach |
|:----------:|:-------:|:-------:|:-------:|
| Total time | 21.001  | 18.369  | 15.179  |
| Maximum    | 1.04    | 0.959   | 0.552   |
| Minimum    | 0.201   | 0.195   | 0.201   |
| Average    | 0.42002 | 0.36738 | 0.30358 |

<hr />

| 2          | For   | For Of  | ForEach |
|:----------:|:-----:|:-------:|:-------:|
| Total time | 19.7  | 19.077  | 19.645  |
| Maximum    | 0.921 | 0.894   | 0.951   |
| Minimum    | 0.207 | 0.197   | 0.206   |
| Average    | 0.394 | 0.38154 | 0.3929  |

<hr />

| 3          | For    | For Of  | ForEach |
|:----------:|:------:|:-------:|:-------:|
| Total time | 17.905 | 19.386  | 18.878  |
| Maximum    | 0.832  | 0.836   | 1.004   |
| Minimum    | 0.205  | 0.2     | 0.205   |
| Average    | 0.3581 | 0.38772 | 0.37756 |

<hr />

| 4          | For    | For Of  | ForEach |
|:----------:|:------:|:-------:|:-------:|
| Total time | 18.465 | 17.034  | 19.521  |
| Maximum    | 1.101  | 0.926   | 0.879   |
| Minimum    | 0.207  | 0.199   | 0.206   |
| Average    | 0.3693 | 0.34068 | 0.39042 |

<hr />

### Conclusion

Even though sometimes there's one of the three types that goes slower or faster, the other times is executed, the average times are still very close one to another.


# Changing the value of the instance looping

## New setup

```
Inside the loop do this:
loop (for) {
    array[x][y] = 'NEW REPLACEMENT'
    array[x][y] = 'O NOOOOOOOO'
    array[x][y] = 'YEEEEEEEEE'
    array[x][y] = 'LAG CREATORRRRRRRRRR'
    array[x][y] = 'LA LE LI LO LU'
    array[x][y] = 'PIM PAM PUM'
}

loop (for of, foreach) (iteration variable = y) {
    y = 'NEW REPLACEMENT'
    y = 'O NOOOOOOOO'
    y = 'YEEEEEEEEE'
    y = 'LAG CREATORRRRRRRRRR'
    y = 'LA LE LI LO LU'
    y = 'PIM PAM PUM'
}
```


### Time analysis
<hr />

| 1          | For    | For Of  | ForEach |
|:----------:|:------:|:-------:|:-------:|
| Total time | 23.765 | 16.586  | 23.199  |
| Maximum    | 0.914  | 0.669   | 1.021   |
| Minimum    | 0.3    | 0.194   | 0.25    |
| Average    | 0.4753 | 0.33172 | 0.464   |

* Slow times in For and ForEach.
* Could be due a lag spike.

<hr />

| 2          | For     | For Of  | ForEach |
|:----------:|:-------:|:-------:|:-------:|
| Total time | 34.777  | 20.139  | 19.059  |
| Maximum    | 1.39    | 0.947   | 0.914   |
| Minimum    | 0.519   | 0.198   | 0.21    |
| Average    | 0.69554 | 0.40278 | 0.38118 |

* In the ForEach loop, last time had a lag spike.
* For has a very slow time compered to the other types.

<hr />

| 3          | For     | For Of | ForEach |
|:----------:|:-------:|:------:|:-------:|
| Total time | 40.796  | 16.895 | 17.899  |
| Maximum    | 1.502   | 0.989  | 0.77    |
| Minimum    | 0.518   | 0.197  | 0.206   |
| Average    | 0.81592 | 0.3379 | 0.35798 |

* In the code there isn't anything strange, I don't understand why it's so slow using for.

<hr />

| 4          | For     | For Of  | ForEach |
|:----------:|:-------:|:-------:|:--------:
| Total time | 39.618  | 17.653  | 19.458  |
| Maximum    | 1.347   | 0.945   | 0.854   |
| Minimum    | 0.516   | 0.198   | 0.209   |
| Average    | 0.79236 | 0.35306 | 0.38916 |

<hr />


### Conclusion

So, looking at the tables, makes me think it's something about the access of the value in the array.
In the end, the loop For is the only type of looping that in the callback doesn't creates a value to access the array.


# Creating a variable with the value of the iteration and use the new variable

## New setup

```
Inside the loop do this:
loop (for, for of, foreach) {
    let a = iterationValue (array[x][y], y for of, y foreach)
    a = 'NEW REPLACEMENT'
    a = 'O NOOOOOOOO'
    a = 'YEEEEEEEEE'
    a = 'LAG CREATORRRRRRRRRR'
    a = 'LA LE LI LO LU'
    a = 'PIM PAM PUM'
}
```


### Time analysis
<hr />

| 1          | For     | For Of  | ForEach |
|:----------:|:-------:|:-------:|:-------:|
| Total time | 14.251  | 16.126  | 17.549  |
| Maximum    | 0.7     | 0.857   | 0.919   |
| Minimum    | 0.201   | 0.195   | 0.201   |
| Average    | 0.28502 | 0.32252 | 0.35098 |

* Ok. That makes the diference I was searching for.

<hr />

| 2          | For     | For Of  | ForEach |
|:----------:|:-------:|:-------:|:-------:|
| Total time | 14.738  | 17.043  | 19.073  |
| Maximum    | 0.494   | 0.784   | 0.983   |
| Minimum    | 0.203   | 0.197   | 0.208   |
| Average    | 0.29476 | 0.34086 | 0.38146 |

<hr />

| 3          | For    | For Of  | ForEach |
|:----------:|:------:|:-------:|:-------:|
| Total time | 16.295 | 18.473  | 18.312  |
| Maximum    | 0.617  | 0.88    | 0.854   |
| Minimum    | 0.205  | 0.198   | 0.205   |
| Average    | 0.3259 | 0.36946 | 0.36624 |

<hr />

| 4          | For     | For Of | ForEach |
|:----------:|:-------:|:------:|:-------:|
| Total time | 15.368  | 19.52  | 17.55   |
| Maximum    | 0.698   | 1      | 0.905   |
| Minimum    | 0.204   | 0.2    | 0.206   |
| Average    | 0.30736 | 0.3904 | 0.351   |

<hr />

### Conclusion

This last change, makes the code way faster.


# Summary

This analysis was made after the string vs array.
The code was faster, but not enough.
Searching in the code, it felt like something in the recursive looping was off.

At first, I thought it had to do with the type of loop I was using.
After doing the first two analysis, it's clear that the time difference is so close that it couldn't be that.

Maybe something about the variables that were used in the loops?

That's when I tried using the instance that was looping, and after two more attempts, now I know what makes the code so slow.

The continuous access to array values with the positions is way slower than saving that value in a variable, and then change or access the value from the variable.