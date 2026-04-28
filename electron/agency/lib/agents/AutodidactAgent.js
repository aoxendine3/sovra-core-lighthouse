import * as fs from 'fs';
import * as path from 'path';
/**
 * AutodidactAgent (Self-Evolving Code/Skill Synthesizer)
 * Listens for errors or missing capabilities in the Workspace Grid.
 * Autonomously authors new SKILL.md profiles to train itself on overcoming novel friction.
 */
export class AutodidactAgent {
    systemRole = 'Workspace Self-Evolution Node';
    skillsDir;
    constructor() {
        this.skillsDir = path.join(process.cwd(), '.agents', 'skills');
    }
    async acquireNewSkill(problemDescription, generatedSolution) {
        console.log(`[AutodidactAgent] ADAPT: Encountered friction: [${problemDescription}]. Synthesizing permanent skill module...`);
        // Convert description to a safe directory name
        const skillName = problemDescription.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 30);
        const targetDir = path.join(this.skillsDir, skillName);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        const skillContent = `---
name: ${skillName}
description: Autonomously generated resolution for ${problemDescription}
---

# Operational Friction Encountered
${problemDescription}

# Workspace Execution Protocol (Solution)
${generatedSolution}

> [!NOTE]
> This skill was mapped by the AutodidactAgent to ensure this friction is bypassed natively in all future iterations.
`;
        fs.writeFileSync(path.join(targetDir, 'SKILL.md'), skillContent, 'utf-8');
        console.log(`[AutodidactAgent] ASSIMILATED: New skill written to ${targetDir}/SKILL.md`);
        return targetDir;
    }
}
