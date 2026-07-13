// backend/src/services/ratingService.js

class RatingService {
  
  calculateRating(value, benchmark) {
    if (value === null || value === undefined || value === 'N/A' || value === '') {
      return {
        rating: null,
        value: value,
        label: benchmark.label,
        unit: benchmark.unit,
        icon: benchmark.icon,
        explanation: null,
        color: null,
        isHigherBetter: benchmark.isHigherBetter,
      };
    }

    const numericValue = this.parseNumericValue(value);
    if (numericValue === null) {
      return {
        rating: null,
        value: value,
        label: benchmark.label,
        unit: benchmark.unit,
        icon: benchmark.icon,
        explanation: null,
        color: null,
        isHigherBetter: benchmark.isHigherBetter,
      };
    }

    const { minValue, maxValue, isHigherBetter } = benchmark;
    const clampedValue = Math.min(Math.max(numericValue, minValue), maxValue);
    
    let rating;
    if (isHigherBetter) {
      rating = ((clampedValue - minValue) / (maxValue - minValue)) * 9 + 1;
    } else {
      rating = ((maxValue - clampedValue) / (maxValue - minValue)) * 9 + 1;
    }
    
    rating = Math.round(rating * 10) / 10;
    const color = this.getColorForRating(rating);
    const explanation = this.getExplanationForRating(rating, benchmark);
    
    return {
      rating,
      value: numericValue,
      displayValue: `${numericValue} ${benchmark.unit}`,
      label: benchmark.label,
      unit: benchmark.unit,
      icon: benchmark.icon,
      color,
      explanation,
      isHigherBetter,
    };
  }
  
  calculateMultipleRatings(data, benchmarks) {
    const results = {};
    benchmarks.forEach(benchmark => {
      const fieldPath = benchmark.variantFieldPath;
      const value = this.getValueByPath(data, fieldPath);
      
      console.log(`📊 Calculating ${benchmark.key}:`, {
        fieldPath,
        value,
        data: data,
      });
      
      results[benchmark.key] = this.calculateRating(value, benchmark);
    });
    return results;
  }
  
  compareCars(car1Data, car2Data, benchmarks, car3Data = null) {
    const car1Ratings = this.calculateMultipleRatings(car1Data, benchmarks);
    const car2Ratings = this.calculateMultipleRatings(car2Data, benchmarks);
    const car3Ratings = car3Data ? this.calculateMultipleRatings(car3Data, benchmarks) : null;

    const wins = { car1Wins: 0, car2Wins: 0, car3Wins: 0, ties: 0 };

    Object.keys(car1Ratings).forEach(key => {
      const contenders = [
        { slot: 'car1Wins', rating: car1Ratings[key].rating },
        { slot: 'car2Wins', rating: car2Ratings[key].rating },
      ];
      if (car3Ratings) {
        contenders.push({ slot: 'car3Wins', rating: car3Ratings[key].rating });
      }

      const withRatings = contenders.filter(c => c.rating !== null);
      if (withRatings.length < 2) return; // need at least 2 comparable ratings for this row to count

      const maxRating = Math.max(...withRatings.map(c => c.rating));
      const topContenders = withRatings.filter(c => c.rating === maxRating);

      if (topContenders.length > 1) {
        wins.ties++;
      } else {
        wins[topContenders[0].slot]++;
      }
    });

    const buildCarOutput = (data, ratings) => ({
      id: data._id,
      name: data.name,
      model: data.modelName,
      brand: data.brandName,
      price: data.price,
      image: data.image,
      brandIcon: data.brandIcon,
      overallScore: data.overallScore || null,
      ratings,
    });

    const winCounts = car3Ratings
      ? { car1: wins.car1Wins, car2: wins.car2Wins, car3: wins.car3Wins }
      : { car1: wins.car1Wins, car2: wins.car2Wins };
    const maxWinCount = Math.max(...Object.values(winCounts));
    const topWinners = Object.keys(winCounts).filter(slot => winCounts[slot] === maxWinCount);
    const overallWinner = maxWinCount === 0 || topWinners.length > 1 ? 'tie' : topWinners[0];

    const result = {
      car1: buildCarOutput(car1Data, car1Ratings),
      car2: buildCarOutput(car2Data, car2Ratings),
      summary: {
        car1Wins: wins.car1Wins,
        car2Wins: wins.car2Wins,
        ...(car3Ratings ? { car3Wins: wins.car3Wins } : {}),
        ties: wins.ties,
        overallWinner,
      },
    };

    if (car3Ratings) {
      result.car3 = buildCarOutput(car3Data, car3Ratings);
    }

    return result;
  }
  
  getColorForRating(rating) {
    if (rating >= 8) return 'green';
    if (rating >= 5) return 'yellow';
    return 'red';
  }
  
  getExplanationForRating(rating, benchmark) {
    const { explanations } = benchmark;
    if (rating >= 8) return explanations.excellent;
    if (rating >= 5) return explanations.good;
    if (rating >= 3) return explanations.average;
    return explanations.needsImprovement;
  }
  
  parseNumericValue(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      // Handle values like "375 L", "190 mm", "5.3 m"
      const match = value.match(/^[\d.]+/);
      if (match) return parseFloat(match[0]);
    }
    return null;
  }
  
  getValueByPath(obj, path) {
    if (!path) return null;
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current === null || current === undefined) return null;
      current = current[part];
    }
    return current;
  }
}

module.exports = new RatingService();