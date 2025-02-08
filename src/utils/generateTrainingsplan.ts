import { trainingsPlans, Zielzeit } from '@/data/trainingsPlans';

export const generateTrainingsplan = (zielzeit: Zielzeit) => {
    const basePlan = trainingsPlans[zielzeit];

    if (!basePlan) {
        throw new Error('Trainingsplan für die angegebene Zielzeit nicht gefunden.');
    }

    return {
        zielzeit,
        plan: basePlan.plan,
    };
};