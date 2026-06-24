import { useEffect, useState } from "react";

const INITIAL_LOGS = [
  {
    text: ">_ Initializing sandbox environment...",
    type: "system",
  },
  {
    text: ">_ Connecting to CodeWar Compiler Hub...",
    type: "system",
  },
  {
    text: ">_ Problem A: 'Optimized Pathing' - Loaded 120 test cases",
    type: "info",
  },
  {
    text: ">_ Running compiler test suite... OK",
    type: "success",
  },
  {
    text: ">_ user_x86 submitted Solution.cpp [Problem B] - compiling...",
    type: "user",
  },
];

const SAMPLE_LOGS = [
  {
    text: ">_ user_neophyte submitted solution.py - COMPILING",
    type: "user",
  },
  {
    text: ">_ Test case #24/50: PASSED (18ms)",
    type: "success",
  },
  {
    text: ">_ Test case #50/50: PASSED (12ms)",
    type: "success",
  },
  {
    text: ">_ Problem A solved by user_neophyte [100 pts]",
    type: "success",
  },
  {
    text: ">_ user_rustacean submitted main.rs - COMPILING",
    type: "user",
  },
  {
    text: ">_ Compiler error: unused variable 'result'",
    type: "error",
  },
  {
    text: ">_ user_lambda submitted solution.cpp - COMPILING",
    type: "user",
  },
  {
    text: ">_ Test case #12/80: Time Limit Exceeded",
    type: "error",
  },
  {
    text: ">_ user_dev_null submitted Solution.java - COMPILING",
    type: "user",
  },
  {
    text: ">_ Test case #100/100: PASSED (42ms)",
    type: "success",
  },
  {
    text: ">_ Problem C solved by user_dev_null [150 pts]",
    type: "success",
  },
  {
    text: ">_ Active sandbox instances: 342 | Queue size: 1",
    type: "system",
  },
];

export default function useTerminalLogs() {
  const [logs, setLogs] = useState(INITIAL_LOGS);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next =
          SAMPLE_LOGS[
            Math.floor(Math.random() * SAMPLE_LOGS.length)
          ];

        return [...prev, next].slice(-8);
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return logs;
}