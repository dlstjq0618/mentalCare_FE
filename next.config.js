const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALIZE === "true",
});

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  images: {
    domains: [
      "temp-spacepharmacy.s3.ap-northeast-2.amazonaws.com",
      "dev-spacepharmacy.s3.ap-northeast-2.amazonaws.com",
      "prod-spacepharmacy.s3.ap-northeast-2.amazonaws.com",
      "",
    ],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

const sentryWebpackPluginOptions = {
  autoToken: "ea50b788892d40c183a299fbe78c76a77f8339a922fe49c6ae43a526b12299c4",
  // additional config options for the sentry webpack plugin. keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authtoken, configfile, stripprefix,
  //   urlprefix, include, ignore

  silent: true, // suppresses all logs
  // for all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
module.exports = withBundleAnalyzer(
  withSentryConfig(moduleExports, sentryWebpackPluginOptions)
);
