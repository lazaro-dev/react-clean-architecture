import { LocalSaveAccessToken } from "./local-save-access-token";
import faker from "faker";
import { SetStorageSpy } from "@/data/test/mock-storage";

// const makeSut = ()

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value',async () => {
    const setStorageSpy = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorageSpy);
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  })
  
})
