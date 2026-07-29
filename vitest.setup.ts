import {cleanup} from "@testing-library/react";
import '@testing-library/jest-dom/vitest'
import {beforeAll, afterEach, afterAll} from "vitest";
import { server } from "./src/mocks/server";

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

afterEach(() => cleanup());