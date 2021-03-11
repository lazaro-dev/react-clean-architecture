import { LocalSaveAccessToken } from "./local-save-access-token";
import faker from "faker";
import { SetStorageSpy } from "@/data/test/mock-storage";

type SutTypes = {
  sut: LocalSaveAccessToken,
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveAccessToken(setStorageSpy);
  return { 
    sut,
    setStorageSpy
   }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value',async () => {
    const { sut, setStorageSpy } = makeSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  })
  
})
