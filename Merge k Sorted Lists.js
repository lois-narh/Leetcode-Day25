/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    // Custom min-heap implementation
    class MinHeap {
        constructor() {
            this.heap = [];
        }
        
        push(node, index) {
            this.heap.push([node.val, index, node]);
            this._siftUp(this.heap.length - 1);
        }
        
        pop() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();
            
            const result = this.heap[0];
            this.heap[0] = this.heap.pop();
            this._siftDown(0);
            return result;
        }
        
        _siftUp(index) {
            while (index > 0) {
                const parent = Math.floor((index - 1) / 2);
                if (this.heap[parent][0] > this.heap[index][0]) {
                    [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
                    index = parent;
                } else {
                    break;
                }
            }
        }
        
        _siftDown(index) {
            while (true) {
                let smallest = index;
                const left = 2 * index + 1;
                const right = 2 * index + 2;
                
                if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) {
                    smallest = left;
                }
                if (right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) {
                    smallest = right;
                }
                
                if (smallest !== index) {
                    [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                    index = smallest;
                } else {
                    break;
                }
            }
        }
        
        isEmpty() {
            return this.heap.length === 0;
        }
    }
    
    // Create dummy node for result
    const dummy = new ListNode(0);
    let current = dummy;
    
    // Initialize min heap
    const heap = new MinHeap();
    
    // Add first node of each list to heap
    for (let i = 0; i < lists.length; i++) {
        if (lists[i]) {
            heap.push(lists[i], i);
        }
    }
    
    // Process heap until empty
    while (!heap.isEmpty()) {
        const [val, i, node] = heap.pop();
        
        // Add smallest node to result
        current.next = node;
        current = current.next;
        
        // Add next node from same list to heap
        if (node.next) {
            heap.push(node.next, i);
        }
    }
    
    return dummy.next;
};