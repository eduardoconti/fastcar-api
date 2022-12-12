import { Logger } from "@infra/logger";

interface SutTypes {
   sut: Logger;
}

const makeSut = (): SutTypes => {
   const sut = new Logger();
   return {
      sut,
   };
};
describe("Logger", () => {
   it("should execute logger.info", () => {
      const { sut } = makeSut();

      expect(sut.info("should execute logger.info")).toBeCalled;
   });

   it("should execute logger.error", () => {
      const { sut } = makeSut();

      expect(sut.error("should execute logger.error")).toBeCalled;
   });

   it("should execute logger.system", () => {
      const { sut } = makeSut();

      expect(sut.system("should execute logger.system")).toBeCalled;
   });
});
