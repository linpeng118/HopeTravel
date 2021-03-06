import state from "./state";

const getters = {
    token: state => state.token,
    language: state => state.language,
    currency: state => state.currency,
    deviceType: state => state.deviceType,
    profile: state => state.profile.profile,
    national: state => state.profile.national,
    closeDown: state => state.closeDown,
    shareReport: state => state.saleUnion.shareReport,
    friendReport: state => state.saleUnion.friendReport,
    incomeReport: state => state.saleUnion.incomeReport,
    payInfo: state => state.saleUnion.payInfo,
    reservePro: state => state.product.reservePro,
    getCountryCode: state => state.common.countryCode,
}
export default getters