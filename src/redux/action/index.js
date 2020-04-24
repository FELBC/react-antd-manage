/**
 * Action 类型
*/
export const type = {
    SWITCH_MENU:'SWITCH_MENU'
}

// 切换菜单action
export function switchMenu(menuName){
    return{
        type:type.SWITCH_MENU,
        menuName
    }
}