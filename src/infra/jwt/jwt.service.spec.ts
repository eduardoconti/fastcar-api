import jwt from "jsonwebtoken";

import { JwtService } from "./jwt.service";
jest.mock("jsonwebtoken", () => ({
   verify: jest.fn().mockReturnValue(true),
   sign: jest.fn().mockReturnValue("mocked-jwt-payload")
}));
describe("JwtService", ()=>{

   process.env.JWT_SECRET = "jwtsecret";

   const jwtService = new JwtService();

   it("should be defined", () =>{
      expect(jwtService).toBeDefined();
   });

   it("should be generate token", ()=>{
      const token = jwtService.sign<{
         fake: string
      }>({
         fake: "fake"
      });

      expect(token).toBeDefined();
   });

   it("should be verify return true", ()=>{
      const verification = jwtService.verify("faketokwn");
      expect(verification).toBeTruthy();
   });

   it("should be verify return false", ()=>{
      jest.spyOn(jwt, "verify").mockImplementation(() => {
         throw new Error("");
      });
      const verification = jwtService.verify("faketoken");
      expect(verification).toBeFalsy();
   });
});