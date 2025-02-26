import { createNPC } from "../npc-generation/createNPC"
import { guardData } from "./guardData"
import { randomRange, randomValue } from "../rolls"

export function createGuard(town) {
  console.groupCollapsed(`creating the guard...`)

  const guard = {
    name: `default`,
    associatedTown: town.name,
    captain: createNPC(town, {
      dndClass: `fighter`,
      profession: `guard`,
      background: `soldier`,
    }),
    passageName: `GuardOutput`,
    livery: `${randomValue(guardData.primaryColours)} and ${randomValue(
      guardData.secondaryColours
    )} livery adorned with an image of ${randomValue(guardData.insignia)}`,
  }

  const nameRoll = randomRange(1, 8)
  console.log(`nameRoll is ${nameRoll}`)

  const { name } = guardData

  if (nameRoll === 1) {
    guard.name = `The ${randomValue(name.group)} of ${town.name}`
  } else if (nameRoll === 2) {
    guard.name = `The ${town.name} ${randomValue(name.group)}`
  } else if (nameRoll === 3) {
    guard.name = `The ${randomValue(name.group)} of ${randomValue(name.alternateAdjective)}`
  } else if (nameRoll === 4) {
    guard.name = `The ${randomValue(name.adjective)} ${randomValue(name.group)}`
  } else if (nameRoll === 5) {
    guard.name = `The ${randomValue(name.adjective)} ${randomValue(name.noun)}`
  } else if (nameRoll === 6) {
    guard.name = `The ${randomValue(name.adjective)} ${randomValue(name.noun)} of ${randomValue(
      name.alternateAdjective
    )}`
  } else if (nameRoll === 7) {
    guard.name = `The ${randomValue(name.adjective)} ${randomValue(name.noun)} of ${town.name}`
  } else if (nameRoll === 8) {
    guard.name = `The ${randomValue(name.group)} ${randomValue(name.noun)} of ${town.name}`
  }

  console.log(`${guard.name} is the name of the guard.`)
  console.groupEnd()

  return guard
}
