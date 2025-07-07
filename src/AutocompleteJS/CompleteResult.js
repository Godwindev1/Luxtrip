export class PlacePrediction {
  constructor(data) {
    this.place = data.place;
    this.placeId = data.placeId;
    this.text = data.text?.text || '';
    this.matches = data.text?.matches || [];
  }
}

export function parsePlacePredictions(json)
 {
  return (json.suggestions || [])
    .filter(item => item.placePrediction)
    .map(item => new PlacePrediction(item.placePrediction));
}
