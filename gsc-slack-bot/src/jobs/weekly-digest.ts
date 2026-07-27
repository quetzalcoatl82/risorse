import {
  getAttentionPages,
  getRisingKeywords,
  getSurpriseArticle,
  getTopPages,
  getTopQueries,
} from "../gsc/analytics";
import { postToSlack, weeklyDigestMessage, type SlackMessage } from "../slack/messages";

export async function buildWeeklyDigest(env: Env): Promise<SlackMessage> {
  const [discoverTop, searchTop, keywords, rising, surprise, attention] = await Promise.all([
    getTopPages(env, 7, "discover", 5),
    getTopPages(env, 7, "search", 5),
    getTopQueries(env, 7, 10),
    getRisingKeywords(env, 3),
    getSurpriseArticle(env),
    getAttentionPages(env, 3),
  ]);

  return weeklyDigestMessage({
    discoverTop,
    searchTop,
    keywords,
    rising,
    surprise,
    attention,
  });
}

export async function runWeeklyDigest(env: Env): Promise<void> {
  console.log(JSON.stringify({ event: "weekly_digest_start" }));

  const message = await buildWeeklyDigest(env);
  await postToSlack(env.SLACK_BOT_TOKEN, env.SLACK_CHANNEL_ID, message);

  console.log(JSON.stringify({ event: "weekly_digest_complete" }));
}
