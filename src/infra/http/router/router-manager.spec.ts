/* eslint-disable @typescript-eslint/no-empty-function */
import { badRequest } from "@app/errors";
import { ControllerRequest, IController } from "@app/interfaces";
import { Result } from "@domain/contracts";
import { ArgumentInvalidException } from "@domain/exceptions";
import {
   DuplicatedRouteException,
   InvalidRouteException,
} from "@infra/exceptions";

import { Atributes, HttpRequest, HttpResponse } from "../interfaces";

import { HttpResponseHandler } from "./http-response-handler";
import { Route } from "./route";
import { RouterManager } from "./router-manager";

class RouteStub extends Route {
   protected _controller!: IController<any>;
}

class ControllerStub implements IController {
   async handle(
      request?: ControllerRequest<any>,
   ): Promise<Result<ControllerRequest<any>>> {
      return Result.ok(request);
   }
}

const controller = new ControllerStub();

describe("test router manager", () => {
   beforeEach(() => {
      RouterManager.clearRoutes();
      jest.clearAllMocks();
   });
   describe("route", () => {
      it("should be defined", () => {
         expect(
            new RouteStub({
               method: "POST",
               path: "teste",
               controller,
            }),
         ).toBeDefined();
      });

      it("should be throw error if path is invalid", () => {
         expect(
            () =>
               new RouteStub({
                  method: "POST",
                  path: "/teste",
                  controller,
               }),
         ).toThrow(InvalidRouteException);
         expect(
            () =>
               new RouteStub({
                  method: "POST",
                  path: "*teste",
                  controller,
               }),
         ).toThrow(InvalidRouteException);
         expect(
            () =>
               new RouteStub({
                  method: "POST",
                  path: "teste/*",
                  controller,
               }),
         ).toThrow(InvalidRouteException);
         expect(
            () =>
               new RouteStub({
                  method: "POST",
                  path: "teste//",
                  controller,
               }),
         ).toThrow(InvalidRouteException);
         expect(
            () =>
               new RouteStub({
                  method: "POST",
                  path: "1",
                  controller,
               }),
         ).toThrow(InvalidRouteException);
      });

      it("should be throw error if duplicated route", () => {
         expect(() => {
            new RouteStub({
               method: "POST",
               path: "teste/:id",
               controller,
            });

            new RouteStub({
               method: "POST",
               path: "teste/:id",
               controller,
            });
         }).toThrow(DuplicatedRouteException);

         expect(() => {
            new RouteStub({
               method: "GET",
               path: "teste",
               controller,
            });

            new RouteStub({
               method: "GET",
               path: "teste",
               controller,
            });
         }).toThrow(DuplicatedRouteException);
      });
      describe("test handle controller", () => {
         it("should be execute successfully", async () => {
            const route = new RouteStub({
               method: "PUT",
               path: "teste",
               controller,
            });

            const result = await route.handleController({
               pathName: "/teste",
               method: "PUT",
            } as HttpRequest);
            expect(result).toBeDefined();
            expect(result.isSuccess).toBeTruthy();
         });

         it("should be execute successfully with auth bearer", async () => {
            const route = new RouteStub({
               method: "GET",
               path: "auth",
               controller,
               auth: "bearer",
            });

            const result = await route.handleController({
               pathName: "/auth",
               method: "GET",
            } as HttpRequest);
            expect(result).toBeDefined();
            expect(result.isSuccess).toBeTruthy();
         });

         it("should be execute successfully with body, params and atributes", async () => {
            const route = new RouteStub({
               method: "POST",
               path: "teste/:id",
               controller,
            });
            const params: Atributes = {};
            params.fakeParam = "321";
            const result = await route.handleController({
               pathName: "/teste/123",
               method: "POST",
               body: { teste: "fakebody" },
               params,
            } as HttpRequest);
            expect(route.atributes).toEqual(["id"]);
            expect(result).toBeDefined();
            expect(result.isSuccess).toBeTruthy();
            expect(result.getValue()).toEqual({
               body: { teste: "fakebody" },
               params: {
                  fakeParam: "321",
               },
               atributes: { id: "123" },
            });
         });

         it("should be execute successfully with many atributes", async () => {
            const route = new RouteStub({
               method: "POST",
               path: "teste/:id/fake/:fakeId/teste/:testeId",
               controller,
            });
            const result = await route.handleController({
               pathName: "/teste/123/fake/12-45-67/teste/1234-asdf-126",
               method: "POST",
               body: { teste: "fakebody" },
            } as HttpRequest);
            expect(route.atributes).toEqual(["id", "fakeId", "testeId"]);
            expect(result).toBeDefined();
            expect(result.isSuccess).toBeTruthy();
            expect(result.getValue()).toEqual({
               body: { teste: "fakebody" },
               atributes: {
                  id: "123",
                  fakeId: "12-45-67",
                  testeId: "1234-asdf-126",
               },
            });
         });

         it("should be execute and return result fail when unknow error ocurred", async () => {
            jest.spyOn(controller, "handle").mockRejectedValue(new Error());
            const route = new RouteStub({
               method: "PUT",
               path: "teste",
               controller,
            });
            const result = await route.handleController({
               pathName: "/teste",
               method: "PUT",
               body: {},
            } as HttpRequest);
            expect(result).toBeDefined();
            expect(result.isFailure).toBeTruthy();
         });

         it("should be execute and return result fail when BaseException ocurred", async () => {
            jest
               .spyOn(controller, "handle")
               .mockRejectedValue(new ArgumentInvalidException("any error"));
            const route = new RouteStub({
               method: "DELETE",
               path: "teste",
               controller,
            });
            const result = await route.handleController({
               pathName: "/teste",
               method: "DELETE",
               body: {},
            } as HttpRequest);
            expect(result).toBeDefined();
            expect(result.isFailure).toBeTruthy();
         });
      });
   });

   describe("router manager", () => {
      const headers: {
         [key: string]: string;
      } = {};

      headers.authorization =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0ZSI6InRlc3RlIiwiaWF0IjoxNjYzNzMwNDQ2fQ._92FNVoWxKMzvtT1LXh8Hq18npDV_SEvZQ_MPpzI0Ao";

      it("should be execute successfully", async () => {
         new RouteStub({
            method: "PUT",
            path: "teste",
            controller,
         });

         expect(
            async () =>
               await RouterManager.execute(
                  {
                     pathName: "/teste",
                     method: "PUT",
                     on: () => {},
                  } as unknown as HttpRequest,
                  {
                     write: () => {},
                     writeHead: () => {},
                     end: () => {},
                  } as unknown as HttpResponse,
               ),
         ).not.toThrow();
      });

      it("should be execute successfully with autentication bearer", async () => {
         new RouteStub({
            method: "PUT",
            path: "teste",
            auth: "bearer",
            controller,
         });
         expect(
            async () =>
               await RouterManager.execute(
                  {
                     pathName: "/teste",
                     method: "PUT",
                     on: () => {},
                     headers,
                  } as unknown as HttpRequest,
                  {
                     write: () => {},
                     writeHead: () => {},
                     end: () => {},
                  } as unknown as HttpResponse,
               ),
         ).not.toThrowError();
      });
   });

   describe("http response handler", () => {
      const headers: {
         [key: string]: string;
      } = {};

      headers.authorization =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0ZSI6InRlc3RlIiwiaWF0IjoxNjYzNzMwNDQ2fQ._92FNVoWxKMzvtT1LXh8Hq18npDV_SEvZQ_MPpzI0Ao";

      it("should be send PUT success", () => {
         expect(() =>
            HttpResponseHandler.send(
               {
                  pathName: "/teste",
                  method: "PUT",
                  on: () => {},
                  headers,
                  body: { teste: "123" },
               } as unknown as HttpRequest,
               {
                  write: () => {},
                  writeHead: () => {},
                  end: () => {},
               } as unknown as HttpResponse,
               Result.ok(""),
            ),
         ).not.toThrowError();
      });

      it("should be send POST success", () => {
         expect(() =>
            HttpResponseHandler.send(
               {
                  pathName: "/teste",
                  method: "POST",
                  on: () => {},
                  headers,
                  body: { teste: "123" },
               } as unknown as HttpRequest,
               {
                  write: () => {},
                  writeHead: () => {},
                  end: () => {},
               } as unknown as HttpResponse,
               Result.ok(),
            ),
         ).not.toThrowError();
      });

      it("should be send GET success", () => {
         expect(() =>
            HttpResponseHandler.send(
               {
                  pathName: "/teste",
                  method: "GET",
                  on: () => {},
                  headers,
               } as unknown as HttpRequest,
               {
                  write: () => {},
                  writeHead: () => {},
                  end: () => {},
               } as unknown as HttpResponse,
               Result.ok(),
            ),
         ).not.toThrowError();
      });

      it("should be send fail", () => {
         expect(() =>
            HttpResponseHandler.send(
               {
                  pathName: "/teste",
                  method: "PUT",
                  on: () => {},
                  headers,
                  body: { teste: "123" },
               } as unknown as HttpRequest,
               {
                  write: () => {},
                  writeHead: () => {},
                  end: () => {},
               } as unknown as HttpResponse,
               Result.fail(badRequest("")),
            ),
         ).not.toThrowError();
      });
   });
});
