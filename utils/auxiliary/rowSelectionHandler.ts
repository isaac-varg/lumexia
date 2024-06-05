// takes a method name (e.g., newTab , rowClick) and runs the appropriate function to get the client to their destination depending on the method and provided path

// allows client to provide their selected path but not have to write all the same code for routing
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { openNewTab } from "./openNewTab";


export type RowSelectionHandlerMethod = 'rowClick' | 'newTab' | 'motion'

export const rowSelectionHandler = (method: RowSelectionHandlerMethod, path: string, router: AppRouterInstance) => {


    switch (method) {
        case 'rowClick':
            router.push(path)
            break;
        case 'newTab': 
            openNewTab(path)
        default:
            break;
    }
}

