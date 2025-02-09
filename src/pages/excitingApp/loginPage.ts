import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrapper";
import { faker } from '@faker-js/faker';
import ListQuotesPage from "./listQuotesPage";
import { fixture } from "../../hooks/pageFixture";

const jsonData = require('../../helper/util/test-data/testDataEyup.json');

export default class GiveAQuotePage {
    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }
}