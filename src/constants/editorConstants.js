export const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'java', name: 'Java' },
  { id: 'python', name: 'Python' },
  { id: 'cpp', name: 'C++' }
]

export const DEFAULT_CODE = {
  javascript: `// Welcome to CodePlayground
// Write your JavaScript code here

function helloWorld() {
  console.log("Hello, World!");
}

helloWorld();`,

  java: `// Welcome to CodePlayground
// Write your Java code here

public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,

  python: `# Welcome to CodePlayground
# Write your Python code here

def hello_world():
    print("Hello, World!")

hello_world()`,

  cpp: `// Welcome to CodePlayground
// Write your C++ code here

#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`
}