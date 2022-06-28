import { Feature } from '@global-volcanic-lightning/types';

export const highestStrikes = (lightning: Feature[]) => {
    return lightning.map((strike) => {
        return (
            {
                twentyKmStrikes: strike.properties.twentyKmStrikes,
                hundredKmStrikes: strike.properties.hundredKmStrikes,
                totalStrikes: Number(strike.properties.twentyKmStrikes + strike.properties.hundredKmStrikes),
                severity: strike.properties.severity,
                name: strike.properties.name
            }
        )
    }).sort((arrayItemA: any, arrayItemB: any) => {
        if (arrayItemA.totalStrikes > arrayItemB.totalStrikes) {
            return -1
        }
    
        if (arrayItemA.totalStrikes < arrayItemB.totalStrikes) {
            return 1
        }

        return 0
    }).splice(0, 10)
};

export const alertStrikes = (lightning: Feature[]) => {
    return lightning.filter((strike) => strike.properties.severity === 'error').map((strike) => {
        return (
            {
                twentyKmStrikes: strike.properties.twentyKmStrikes,
                hundredKmStrikes: strike.properties.hundredKmStrikes,
                totalStrikes: Number(strike.properties.twentyKmStrikes + strike.properties.hundredKmStrikes),
                area: strike.properties.area,
                name: strike.properties.name
            }
        )
    }).sort((arrayItemA: any, arrayItemB: any) => {
        if (arrayItemA.totalStrikes > arrayItemB.totalStrikes) {
            return -1
        }
    
        if (arrayItemA.totalStrikes < arrayItemB.totalStrikes) {
            return 1
        }
    
        return 0
    }).splice(0, 10)  
};
