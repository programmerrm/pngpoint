import { Bottom } from "./bottom";
import { Default } from "./default";
import { Top } from "./top";

export const Main = () => {
    return (
        <div className="flex flex-col flex-wrap w-full h-full">
            <Top />
            <Default />
            <Bottom />
        </div>
    );
}
