import { useSelector } from "react-redux"
import type { RootState } from "../redux/store";

export const useAuth = (): boolean => {
    const { admin, tokens } = useSelector((state: RootState) => state.auth);
    return Boolean(admin && tokens?.access_token);
}
