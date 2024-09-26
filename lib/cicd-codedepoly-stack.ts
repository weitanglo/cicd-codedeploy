import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';

export class CicdCodedepolyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'popeline', {
      pipelineName: 'pipeline',
      synth: new ShellStep('synth', {
        input: CodePipelineSource.gitHub('weitanglo/cicd-codedeploy', 'main'),
        commands:[
          'npm ci',
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cdk.out'
      })
    })

    const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage',{
      stageName: 'test'
    }));
  }
}
