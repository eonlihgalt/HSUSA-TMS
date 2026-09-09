import { ConfigurationService } from "./ConfigurationService";

async function run() {

    const config =
        new ConfigurationService();

    const readinessKnowledgeWeight =
        await config.get(
            "ReadinessKnowledgeWeight"
        );

    const readinessQualificationWeight =
        await config.get(
            "ReadinessQualificationWeight"
        );

    const coverageThreshold =
        await config.get(
            "CoverageThreshold"
        );

    console.log(
        "ReadinessKnowledgeWeight:",
        readinessKnowledgeWeight
    );

    console.log(
        "ReadinessQualificationWeight:",
        readinessQualificationWeight
    );

    console.log(
        "CoverageThreshold:",
        coverageThreshold
    );
}

run();