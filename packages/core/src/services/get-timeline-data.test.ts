import { describe, it, expect } from "vitest";

import type { SpanCardType } from "../types/span";
import { getTimelineData } from "./get-timeline-data";

describe("getTimelineData", () => {
  describe("basic functionality", () => {
    it("should calculate timeline data for a span card within a time range", () => {
      const spanCard: SpanCardType = {
        id: "1",
        title: "LLM Call",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:00:30.000Z"),
        duration: 30000,
        cost: 0.002,
        type: "llm_call",
        tokensCount: 150,
        status: "success",
      };

      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:01:00.000Z");

      const result = getTimelineData({ spanCard, minStart, maxEnd });

      expect(result.durationMs).toBe(30000);
      expect(result.startPercent).toBe(0);
      expect(result.widthPercent).toBe(50);
    });

    it("should handle span cards that start after the minimum time", () => {
      const spanCard: SpanCardType = {
        id: "2",
        title: "Tool Execution",
        startTime: new Date("2023-10-01T10:00:30.000Z"),
        endTime: new Date("2023-10-01T10:00:45.000Z"),
        duration: 15000,
        cost: 0.001,
        type: "tool_execution",
        tokensCount: 50,
        status: "success",
      };

      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:01:00.000Z");

      const result = getTimelineData({ spanCard, minStart, maxEnd });

      expect(result.durationMs).toBe(15000);
      expect(result.startPercent).toBe(50);
      expect(result.widthPercent).toBe(25);
    });

    it("should handle span cards that end before the maximum time", () => {
      const spanCard: SpanCardType = {
        id: "3",
        title: "Agent Invocation",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:00:20.000Z"),
        duration: 20000,
        cost: 0.003,
        type: "agent_invocation",
        tokensCount: 200,
        status: "success",
      };

      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:01:00.000Z");

      const result = getTimelineData({ spanCard, minStart, maxEnd });

      expect(result.durationMs).toBe(20000);
      expect(result.startPercent).toBe(0);
      expect(result.widthPercent).toBe(33.33333333333333);
    });
  });

  describe("edge cases", () => {
    it("should handle very short duration spans", () => {
      const spanCard: SpanCardType = {
        id: "4",
        title: "Quick Operation",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:00:00.001Z"),
        duration: 1,
        cost: 0.0001,
        type: "chain_operation",
        tokensCount: 10,
        status: "success",
      };

      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:00:01.000Z");

      const result = getTimelineData({ spanCard, minStart, maxEnd });

      expect(result.durationMs).toBe(1);
      expect(result.startPercent).toBe(0);
      expect(result.widthPercent).toBe(0.1);
    });

    it("should handle very long duration spans", () => {
      const spanCard: SpanCardType = {
        id: "5",
        title: "Long Running Task",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:00:59.000Z"),
        duration: 59000,
        cost: 0.005,
        type: "retrieval",
        tokensCount: 500,
        status: "success",
      };

      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:01:00.000Z");

      const result = getTimelineData({ spanCard, minStart, maxEnd });

      expect(result.durationMs).toBe(59000);
      expect(result.startPercent).toBe(0);
      expect(result.widthPercent).toBeCloseTo(98.33);
    });

    it("should handle spans that span the entire time range", () => {
      const spanCard: SpanCardType = {
        id: "6",
        title: "Full Range Span",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:01:00.000Z"),
        duration: 60000,
        cost: 0.01,
        type: "embedding",
        tokensCount: 1000,
        status: "success",
      };

      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:01:00.000Z");

      const result = getTimelineData({ spanCard, minStart, maxEnd });

      expect(result.durationMs).toBe(60000);
      expect(result.startPercent).toBe(0);
      expect(result.widthPercent).toBe(100);
    });

    it("should handle spans that are exactly at the boundaries", () => {
      const spanCard: SpanCardType = {
        id: "7",
        title: "Boundary Span",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:00:00.000Z"),
        duration: 0,
        cost: 0,
        type: "unknown",
        tokensCount: 0,
        status: "success",
      };

      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:00:01.000Z");

      const result = getTimelineData({ spanCard, minStart, maxEnd });

      expect(result.durationMs).toBe(0);
      expect(result.startPercent).toBe(0);
      expect(result.widthPercent).toBe(0);
    });
  });

  describe("percentage calculations", () => {
    it("should calculate start percentage correctly for various positions", () => {
      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:01:00.000Z");

      // Test at 25% of the timeline
      const spanCard1: SpanCardType = {
        id: "8",
        title: "25% Position",
        startTime: new Date("2023-10-01T10:00:15.000Z"),
        endTime: new Date("2023-10-01T10:00:20.000Z"),
        duration: 5000,
        cost: 0.001,
        type: "llm_call",
        tokensCount: 100,
        status: "success",
      };

      const result1 = getTimelineData({
        spanCard: spanCard1,
        minStart,
        maxEnd,
      });
      expect(result1.startPercent).toBe(25);

      // Test at 75% of the timeline
      const spanCard2: SpanCardType = {
        id: "9",
        title: "75% Position",
        startTime: new Date("2023-10-01T10:00:45.000Z"),
        endTime: new Date("2023-10-01T10:00:50.000Z"),
        duration: 5000,
        cost: 0.001,
        type: "tool_execution",
        tokensCount: 100,
        status: "success",
      };

      const result2 = getTimelineData({
        spanCard: spanCard2,
        minStart,
        maxEnd,
      });
      expect(result2.startPercent).toBe(75);
    });

    it("should calculate width percentage correctly for various durations", () => {
      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:01:00.000Z");

      // Test 10% width
      const spanCard1: SpanCardType = {
        id: "10",
        title: "10% Width",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:00:06.000Z"),
        duration: 6000,
        cost: 0.001,
        type: "chain_operation",
        tokensCount: 100,
        status: "success",
      };

      const result1 = getTimelineData({
        spanCard: spanCard1,
        minStart,
        maxEnd,
      });
      expect(result1.widthPercent).toBe(10);

      // Test 20% width
      const spanCard2: SpanCardType = {
        id: "11",
        title: "20% Width",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:00:12.000Z"),
        duration: 12000,
        cost: 0.002,
        type: "retrieval",
        tokensCount: 200,
        status: "success",
      };

      const result2 = getTimelineData({
        spanCard: spanCard2,
        minStart,
        maxEnd,
      });
      expect(result2.widthPercent).toBe(20);
    });
  });

  describe("time range variations", () => {
    it("should handle different time range scales", () => {
      const spanCard: SpanCardType = {
        id: "15",
        title: "Micro Operation",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:00:00.100Z"),
        duration: 100,
        cost: 0.00001,
        type: "chain_operation",
        tokensCount: 5,
        status: "success",
      };

      // 1 second range
      const minStart1 = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd1 = +new Date("2023-10-01T10:00:01.000Z");
      const result1 = getTimelineData({
        spanCard,
        minStart: minStart1,
        maxEnd: maxEnd1,
      });
      expect(result1.widthPercent).toBe(10);

      // 100 millisecond range
      const minStart2 = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd2 = +new Date("2023-10-01T10:00:00.200Z");
      const result2 = getTimelineData({
        spanCard,
        minStart: minStart2,
        maxEnd: maxEnd2,
      });
      expect(result2.widthPercent).toBe(50);
    });

    it("should handle very large time ranges", () => {
      const spanCard: SpanCardType = {
        id: "16",
        title: "Long Running Process",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:05:00.000Z"),
        duration: 300000,
        cost: 0.05,
        type: "embedding",
        tokensCount: 5000,
        status: "success",
      };

      // 1 hour range
      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T11:00:00.000Z");

      const result = getTimelineData({ spanCard, minStart, maxEnd });

      expect(result.durationMs).toBe(300000);
      expect(result.startPercent).toBe(0);
      expect(result.widthPercent).toBeCloseTo(8.33);
    });
  });

  describe("precision and floating point handling", () => {
    it("should handle precise timing calculations", () => {
      const spanCard: SpanCardType = {
        id: "17",
        title: "Precise Operation",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:00:00.001Z"),
        duration: 1,
        cost: 0.000001,
        type: "unknown",
        tokensCount: 1,
        status: "success",
      };

      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:00:00.010Z");

      const result = getTimelineData({ spanCard, minStart, maxEnd });

      expect(result.durationMs).toBe(1);
      expect(result.startPercent).toBe(0);
      expect(result.widthPercent).toBe(10);
    });

    it("should handle edge case where span duration equals total range", () => {
      const spanCard: SpanCardType = {
        id: "18",
        title: "Full Range Span",
        startTime: new Date("2023-10-01T10:00:00.000Z"),
        endTime: new Date("2023-10-01T10:00:01.000Z"),
        duration: 1000,
        cost: 0.001,
        type: "llm_call",
        tokensCount: 100,
        status: "success",
      };

      const minStart = +new Date("2023-10-01T10:00:00.000Z");
      const maxEnd = +new Date("2023-10-01T10:00:01.000Z");

      const result = getTimelineData({ spanCard, minStart, maxEnd });

      expect(result.durationMs).toBe(1000);
      expect(result.startPercent).toBe(0);
      expect(result.widthPercent).toBe(100);
    });
  });
});
