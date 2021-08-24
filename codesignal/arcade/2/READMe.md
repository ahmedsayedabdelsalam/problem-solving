Given a year, return the century it is in. The first century spans from the year 1 up to and including the year 100, the second - from the year 101 up to and including the year 200, etc.

#### Example

*   For `year = 1905`, the output should be  
    `centuryFromYear(year) = 20`;
*   For `year = 1700`, the output should be  
    `centuryFromYear(year) = 17`.

#### Input/Output

*   **[execution time limit] 4 seconds (rb)**

*   **[input] integer year**

    A positive integer, designating the year.

    _Guaranteed constraints:_  
    `1 ≤ year ≤ 2005`.

*   **[output] integer**

    The number of the century the year is in.

**[Ruby] Syntax Tips**

    # Prints help message to the console
    # Returns a string
    def helloWorld(name)
        print "This prints to the console when you Run Tests"
        return "Hello, " + name
    end
