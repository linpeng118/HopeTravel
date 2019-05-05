import state from "./state";

const getters = {
    token: state => state.token,
    language: state => state.language,
    deviceType: state => state.deviceType,
    profile: state => state.profile.profile,
    closeDown: state => state.closeDown,
    shareReport: state => state.saleUnion.shareReport,
    friendReport: state => state.saleUnion.friendReport,
    incomeReport: state => state.saleUnion.incomeReport,
    payInfo: state => state.saleUnion.payInfo,
    reservePro: state => state.product.reservePro,
}
export default getters
