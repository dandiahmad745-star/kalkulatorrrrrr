import { config } from 'dotenv';
config();

import '@/ai/flows/generate-realistic-flavor-description.ts';
import '@/ai/flows/rate-experiment-flow.ts';
import '@/ai/flows/get-optimal-brew-time.ts';