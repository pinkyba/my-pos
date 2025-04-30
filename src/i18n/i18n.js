import Vue from "vue";
import VueI18n from "vue-i18n";
import store from "@/store";

import enUSLocale from "@/i18n/json/en-US.json";
import myLocale from "@/i18n/json/my.json";

Vue.use(VueI18n);
let localLang = store.getters.userLangs;
localLang = localLang || "en-US";

//Instantiating a language class
const i18n = new VueI18n({
  locale: localLang, // language identifier
  fallbackLocale: localLang, //Default English language
  silentTranslationWarn: true, // Resolving console warning issues
});

i18n.setLocaleMessage("en-US", { ...enUSLocale })
i18n.setLocaleMessage("my", { ...myLocale})

// Globally variable for $lang ($lang('xxx'))
Vue.prototype.$lang = (key) => {
    return i18n.t(key);
};

export { i18n };