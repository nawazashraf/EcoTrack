const EmissionFactor = require('../models/EmissionFactor');

const calculateEmission = async (category, value) => {
  try {
    const factorDoc = await EmissionFactor.findOne({ 
      category: { $regex: new RegExp(`^${category}$`, 'i') } 
    });

    if (!factorDoc) {
      console.warn(`Warning: No factor found for ${category}`);
      return { co2e: 0, scope: "Unknown" };
    }

    const co2e = value * factorDoc.factor;
    let scope = "Scope 3"; 
    const cat = category.toLowerCase();

    if (cat === 'fuel') {
      scope = "Scope 1";
    }
    
    if (['electricity', 'heating'].includes(cat)) {
      scope = "Scope 2";
    }

    return { 
      co2e: parseFloat(co2e.toFixed(2)), 
      scope 
    };
  } catch (error) {
    console.error("Calculation Error:", error);
    return { co2e: 0, scope: "Error" };
  }
};

module.exports = calculateEmission;