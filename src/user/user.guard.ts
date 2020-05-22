import { DelProps, TransfromData } from "@/common/decorator";
import { User } from './user.entity'

export const UserTransformData = () => TransfromData(User);