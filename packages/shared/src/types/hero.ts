// 英雄卡数据类型（对应数据库 heroes 表）。
// name / biography 为核心字段；hints 为 5 条提示语（顺序从范围大到范围小）。
export interface Hero {
  id: string;
  name: string;
  biography: string;
  hints: string[];
}

/** 结算页展示用的简化英雄信息（只暴露名字与生平简介）。 */
export type HeroReveal = Pick<Hero, 'name' | 'biography'>;

