
declare interface GameSprite {
  name?: string,
  type?: SpriteType,
  width?: number,
  height?: number,
  x?: number,
  y?: number,
  energy?: number,
  image?: string,
}
declare interface GameLevel {
  level: string,
  gridWidth: number | string,
  gridHeight: number | string,
  x: number | string,
  y: number | string,
  sprites?: Map
}
declare interface GameMap {
  name: string,
  levels?: GameLevel[],
}

declare interface App {
  existingMap: boolean,
  mapData?: GameMap[]
}