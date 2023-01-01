export interface NicknameDto {
  info: object;
  size: { width: number; height: number };
  faceCount: number;
  faces: [{ celebrity: { value: string; confidence: number } }];
}
