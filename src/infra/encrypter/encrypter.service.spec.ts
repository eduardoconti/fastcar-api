import { EncrypterService } from "./encrypter.service";

describe("Encrypter service", ()=>{

   const encryper = new EncrypterService();
   it("should be defined", ()=>{
      expect(encryper).toBeDefined();
   });

   it("shoulde be encrypt password", async () =>{

      const password = await encryper.hash("fakePassword");
      expect(password).toBeDefined();
      expect(password).toMatch(/^\$2[ayb]\$.{56}$/);
   });

   it("should be compare password password with success", async () =>{

      const result = await encryper.compare("fakePassword", "$2b$15$Bw53kdeH0qaruPI0g8pieuNMqr7f72DX6.Ls0U/cGsxeBGL7Evct2");

      expect(result).toBeTruthy();
   });

   it("should be compare password password with fail", async () =>{

      const result = await encryper.compare("fakePassword", "2b$15$Bw53kdeH0qaruPI0g8pieuNMqr7f72DX6.Ls0U/cGsxeBGL7Evct2");

      expect(result).toBeFalsy();
   });
  
});