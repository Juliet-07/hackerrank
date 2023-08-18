// In the first case (n=0), the initial height ( h=1) of the tree remains unchanged.
// In the second case (n=1), the tree doubles in height and is 2 meters tall after the spring cycle.
// In the third case (n=4), the tree doubles its height in spring (n=1,h=2), then grows a meter in summer (n=2,h=3) then doubles after the next spring (n=3,h=6), and grows another meter after summer (n=4,h=7). 
//Thus, at the end of 4 cycles, its height is 7 meters.

// Write a javascript function for an utopian tree

function utopianTree(n) {
    let height = 1;
    for (let i = 1; i <= n; i++) {
        if (i % 2 === 1) {
            height *= 2;
        } else {
            height += 1;
        }
    }
    return height;
}

// The function is expected to return an INTEGER.
//  * The function accepts INTEGER n as parameter.