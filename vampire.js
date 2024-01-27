const common = require("mocha/lib/interfaces/common");

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    //check for parent and count loops
    let currentVampire = this;
    let distance = 0;
    while (currentVampire.creator) {
      //if has parent, bookmark parent and loop again
      currentVampire = currentVampire.creator;
      //if not has parent, found root vampire
      distance++;
    }
    return distance;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  closestCommonAncestor(vampire) {
    let currentVampire1 = this;
    let currentVampire2 = vampire
    let commonRelative = null;
    //check once if both vampires are the same, if so, send that vampire, not the parent
    if (currentVampire1 === currentVampire2){
      commonRelative = currentVampire1;
    }
    //use loop to work up the tree from vampire to creator
    while (!commonRelative){
      // if current vampires are parent-child, set common relative to parent and break
      if (currentVampire1.offspring.includes(currentVampire2)){
        commonRelative = currentVampire1;
        break;
      }
      if (currentVampire2.offspring.includes(currentVampire1)){
        commonRelative = currentVampire2;
        break;
      }
      // if current vampires  siblings, return parent (if siblings, neither can be root)
      if(currentVampire1.creator === currentVampire2.creator){
        commonRelative = currentVampire1.creator;
        break;
      }
      // if relative not found by filters increment currentvampire that is farthest from root (not both)
      if (currentVampire1.numberOfVampiresFromOriginal > currentVampire2.numberOfVampiresFromOriginal){
        currentVampire1 = currentVampire1.creator;
        continue;
      }
      if (currentVampire1.numberOfVampiresFromOriginal <= currentVampire2.numberOfVampiresFromOriginal){
        currentVampire2 = currentVampire2.creator;
        continue;
      }
    }
    //return common relative
    return commonRelative;
  }

  
}



module.exports = Vampire;

