import { createTranslator, type MessageTree, type Messages } from "@/lib/messages";
import { defaultLocale, type Locale } from "@/lib/i18n";
import enSource from "@/messages/source/en.json";
import itSource from "@/messages/source/it.json";
import frSource from "@/messages/source/fr.json";
import esSource from "@/messages/source/es.json";
import deSource from "@/messages/source/de.json";
import ptSource from "@/messages/source/pt.json";
import arSource from "@/messages/source/ar.json";
import faSource from "@/messages/source/fa.json";
import zhSource from "@/messages/source/zh.json";
import hiSource from "@/messages/source/hi.json";
import ruSource from "@/messages/source/ru.json";
import jaSource from "@/messages/source/ja.json";
import koSource from "@/messages/source/ko.json";
import trSource from "@/messages/source/tr.json";
import ukSource from "@/messages/source/uk.json";
import swSource from "@/messages/source/sw.json";
import yoSource from "@/messages/source/yo.json";
import igSource from "@/messages/source/ig.json";
import akSource from "@/messages/source/ak.json";
import eeSource from "@/messages/source/ee.json";
import idSource from "@/messages/source/id.json";
import elSource from "@/messages/source/el.json";
import enUi from "@/messages/ui/en.json";
import itUi from "@/messages/ui/it.json";
import frUi from "@/messages/ui/fr.json";
import esUi from "@/messages/ui/es.json";
import deUi from "@/messages/ui/de.json";
import ptUi from "@/messages/ui/pt.json";
import arUi from "@/messages/ui/ar.json";
import faUi from "@/messages/ui/fa.json";
import zhUi from "@/messages/ui/zh.json";
import hiUi from "@/messages/ui/hi.json";
import ruUi from "@/messages/ui/ru.json";
import jaUi from "@/messages/ui/ja.json";
import koUi from "@/messages/ui/ko.json";
import trUi from "@/messages/ui/tr.json";
import ukUi from "@/messages/ui/uk.json";
import swUi from "@/messages/ui/sw.json";
import yoUi from "@/messages/ui/yo.json";
import igUi from "@/messages/ui/ig.json";
import akUi from "@/messages/ui/ak.json";
import eeUi from "@/messages/ui/ee.json";
import idUi from "@/messages/ui/id.json";
import elUi from "@/messages/ui/el.json";

const source: Record<Locale, MessageTree> = {
  en: enSource as unknown as MessageTree,
  it: itSource as unknown as MessageTree,
  fr: frSource as unknown as MessageTree,
  es: esSource as unknown as MessageTree,
  de: deSource as unknown as MessageTree,
  pt: ptSource as unknown as MessageTree,
  ar: arSource as unknown as MessageTree,
  fa: faSource as unknown as MessageTree,
  zh: zhSource as unknown as MessageTree,
  hi: hiSource as unknown as MessageTree,
  ru: ruSource as unknown as MessageTree,
  ja: jaSource as unknown as MessageTree,
  ko: koSource as unknown as MessageTree,
  tr: trSource as unknown as MessageTree,
  uk: ukSource as unknown as MessageTree,
  sw: swSource as unknown as MessageTree,
  yo: yoSource as unknown as MessageTree,
  ig: igSource as unknown as MessageTree,
  ak: akSource as unknown as MessageTree,
  ee: eeSource as unknown as MessageTree,
  id: idSource as unknown as MessageTree,
  el: elSource as unknown as MessageTree,
};

const ui: Record<Locale, MessageTree> = {
  en: enUi as unknown as MessageTree,
  it: itUi as unknown as MessageTree,
  fr: frUi as unknown as MessageTree,
  es: esUi as unknown as MessageTree,
  de: deUi as unknown as MessageTree,
  pt: ptUi as unknown as MessageTree,
  ar: arUi as unknown as MessageTree,
  fa: faUi as unknown as MessageTree,
  zh: zhUi as unknown as MessageTree,
  hi: hiUi as unknown as MessageTree,
  ru: ruUi as unknown as MessageTree,
  ja: jaUi as unknown as MessageTree,
  ko: koUi as unknown as MessageTree,
  tr: trUi as unknown as MessageTree,
  uk: ukUi as unknown as MessageTree,
  sw: swUi as unknown as MessageTree,
  yo: yoUi as unknown as MessageTree,
  ig: igUi as unknown as MessageTree,
  ak: akUi as unknown as MessageTree,
  ee: eeUi as unknown as MessageTree,
  id: idUi as unknown as MessageTree,
  el: elUi as unknown as MessageTree,
};

const english: Messages = {
  source: source[defaultLocale],
  ui: ui[defaultLocale],
};

export const getMessages = (locale: Locale): Messages => ({
  source: source[locale] ?? english.source,
  ui: ui[locale] ?? english.ui,
});

export const getTranslator = (locale: Locale) =>
  createTranslator(getMessages(locale), english, locale !== "en");
