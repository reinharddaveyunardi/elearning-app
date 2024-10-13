import {Children} from "react";

// const UtilsMap = ({of, render, navigation}: any) => {
//     return Children.toArray(of).map((item: any, index: number) =>
//         render(item, index, navigation)
//     );
// };
// const UtilsMap = ({of, render, navigation}: any) => {
//     return Children.toArray(
//         of.map((item: any, index: number) => render(item, index, navigation))
//     );
// };
const UtilsMap = ({of, render, navigation}: any) => {
    if (!of) {
        return null;
    }
    return Children.toArray(
        of.map((item: any, index: number) => render(item, index, navigation))
    );
};

export default UtilsMap;
