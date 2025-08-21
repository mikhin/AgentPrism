import { describe, expect, it } from "vitest";

import type { SpanCardType } from "../types/span";

import { findTimeRange } from "./find-time-range";

describe("findTimeRange", () => {
  it("should return minStart and maxEnd for a single card", () => {
    const cards: SpanCardType[] = [
      {
        id: "1",
        title: "Task 1",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T12:00:00.000Z"),
        duration: 7200,
        attributes: [
          { key: "model", value: { stringValue: "gpt-4" } },
          { key: "prompt_tokens", value: { intValue: "1000" } },
          { key: "completion_tokens", value: { intValue: "500" } },
          { key: "total_tokens", value: { intValue: "1500" } },
          { key: "user_id", value: { stringValue: "user123" } },
        ],
        cost: 100,
        type: "embedding",
        tokensCount: 1,
        status: "success",
      },
    ];

    const result = findTimeRange(cards);

    expect(result).toEqual({
      minStart: +new Date("2023-10-01T10:00:00.000Z"),
      maxEnd: +new Date("2023-10-01T12:00:00.000Z"),
    });
  });

  it("should return minStart and maxEnd for multiple cards", () => {
    const cards: SpanCardType[] = [
      {
        id: "1",
        title: "Task 1",
        attributes: [
          { key: "model", value: { stringValue: "gpt-4" } },
          { key: "prompt_tokens", value: { intValue: "1000" } },
          { key: "completion_tokens", value: { intValue: "500" } },
          { key: "total_tokens", value: { intValue: "1500" } },
          { key: "user_id", value: { stringValue: "user123" } },
        ],
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T12:00:00.000Z"),
        duration: 7200,
        cost: 100,
        type: "chain_operation",
        tokensCount: 1,
        status: "success",
      },
      {
        id: "2",
        title: "Task 2",
        startTime: new Date("2023-10-01T09:00:00.000Z"),
        endTime: new Date("2023-10-01T11:00:00.000Z"),
        duration: 7200,
        cost: 200,
        type: "llm_call",
        attributes: [
          { key: "model", value: { stringValue: "gpt-3.5" } },
          { key: "prompt_tokens", value: { intValue: "800" } },
          { key: "completion_tokens", value: { intValue: "400" } },
          { key: "total_tokens", value: { intValue: "1200" } },
          { key: "user_id", value: { stringValue: "user456" } },
        ],
        tokensCount: 2,
        status: "success",
      },
      {
        id: "3",
        title: "Task 3",
        startTime: new Date("2023-10-01T11:30:00.000Z"),
        endTime: new Date("2023-10-01T13:00:00.000Z"),
        duration: 5400,
        attributes: [
          { key: "model", value: { stringValue: "gpt-4" } },
          { key: "prompt_tokens", value: { intValue: "1200" } },
          { key: "completion_tokens", value: { intValue: "600" } },
          { key: "total_tokens", value: { intValue: "1800" } },
          { key: "user_id", value: { stringValue: "user789" } },
        ],
        cost: 300,
        type: "agent_invocation",
        tokensCount: 3,
        status: "success",
      },
    ];

    const result = findTimeRange(cards);

    expect(result).toEqual({
      minStart: +new Date("2023-10-01T09:00:00.000Z"),
      maxEnd: +new Date("2023-10-01T13:00:00.000Z"),
    });
  });

  it("should return Infinity and -Infinity for an empty array", () => {
    const cards: SpanCardType[] = [];

    const result = findTimeRange(cards);

    expect(result).toEqual({
      minStart: Infinity,
      maxEnd: -Infinity,
    });
  });
});
