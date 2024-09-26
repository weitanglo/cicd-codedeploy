#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CicdCodedepolyStack } from '../lib/cicd-codedepoly-stack';

const app = new cdk.App();
new CicdCodedepolyStack(app, 'CicdCodedepolyStack', {
});

app.synth();