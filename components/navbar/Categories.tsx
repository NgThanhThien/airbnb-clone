'use client';
import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { MdOutlineVilla } from 'react-icons/md';
import { IoDiamond } from 'react-icons/io5';
import CategoryBox from './CategoryBox';
import client from '@/libs/prismadb';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on a island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to a lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is in a castle!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has a camping activities!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property has a camping activities!',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property is in a cave!',
  },
  {
    label: 'Desert',
    icon: GiCastle,
    description: 'This property is in desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in barn!',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious!',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathName = usePathname();
  const isMainPage = pathName === '/';
  return (
    <>
      <Container>
        <div className="tw-pt-4 tw-flex tw-flex-row tw-items-center tw-overflow-auto">
          {categories.map((item) => {
            return (
              <CategoryBox
                key={item.label}
                label={item.label}
                icon={item.icon}
                description={item.description}
                selected={category === item.label}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
};
export default Categories;
