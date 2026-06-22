export const floatingCodeSnippets = [
  "int main() { return 0; }",
  "const solve = (n) => n <= 1 ? 1 : solve(n-1) + solve(n-2);",
  "def dijkstra(graph, start):",
  "import { useState, useEffect } from 'react';",
  "while queue: curr = queue.pop(0)",
  "std::vector<int> dp(n, -1);",
  "fn merge_sort<T: Ord>(arr: &mut [T])",
  "for i in range(1, N):",
  "if (check(mid)) ans = mid; else l = mid + 1;",
  "public static void main(String[] args)",
  "template <typename T> class SegmentTree",
  "q.push({dist[v], v});"
];

export const backgroundParticles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 5 + 2,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 15 + 10,
  delay: Math.random() * 5
}));