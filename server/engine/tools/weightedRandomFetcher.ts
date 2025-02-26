import { randomFloat } from "../rolls"
/**
 * @param town Needed because everything needs town to evaluate
 *
 * @param args The object containing the objects that you're drawing from
 *
 * @param obj The optional npc, building, or whatever that is needed for functions.
 *
 * @param exclusionFunction The optional global exclusion testing function;
 * this is for things like pulling just the paper type objects from plothooks.
 * Saves on LoC. Leave exclusionFunction blank if everyting in your object is
 * always going to be allowed.
 *
 * @param output What should be outputted at the end. Set to 'object' to return the whole object.
 * defaultProbability is the optional default unit. You won't usually need to supply this.
 */
export function weightedRandomFetcher(
  town: any,
  args: any,
  obj: any,
  exclusionFunction?: any,
  output?: any,
  defaultProbability?: any
) {
  if (!output) {
    output = `function`
  }

  if (!defaultProbability) {
    defaultProbability = 10
  }

  const pool: any[] = []

  let totalWeight = 0
  exclusionFunction = exclusionFunction || true

  for (const arg in args) {
    let isValid
    let fnValid
    if (args[arg].exclusions && typeof args[arg].exclusions === `function`) {
      isValid = args[arg].exclusions(town, obj)
    } else {
      isValid = true
    }

    if (args[arg].probability <= 0) {
      isValid = false
    }

    if (typeof exclusionFunction === `function`) {
      fnValid = exclusionFunction(town, args[arg])
    } else {
      fnValid = true
    }

    if (isValid === true && fnValid === true) {
      pool.push(args[arg])
      totalWeight += args[arg].probability || defaultProbability
    }
  }

  let random = Math.floor(randomFloat(1) * totalWeight)
  let selected

  for (const value of pool) {
    random -= value.probability || defaultProbability
    if (random < 0) {
      selected = value
      break
    }
  }

  if (!selected[output] && output !== `object`) {
    console.error(`The randomly fetched object does not have the attribute ${output}.`)
  }

  if (output === `object`) {
    return selected
  } else if (typeof selected[output] === `function`) {
    return selected[output](town, obj)
  } else {
    return selected[output]
  }
}
