const data = require('./data.json')

function format (data) {
  return {
    categories: getCategories(data.category),
    description: data.description,
    name: data.CDName,
    objectID: getID(data),
    soundUrl: getSoundUrl(data),
  }
}

function getID(data) {
  return data.location.split('.')[0]
}

function getSoundUrl(data) {
  return `http://bbcsfx.acropolis.org.uk/../assets/${data.location}`
}

function getCategories(cat, level=0, prefix=null) {
  const ary = cat.split(': ')
  const newPrefix = !!prefix ? [prefix, ary[0]].join(' > ') : ary[0]
  if (ary.length === 1) {
    return {
      [`lvl${level}`]: newPrefix
    }
  } else {
    const remaining = cat.slice(ary[0].length + 2)
    return {
      [`lvl${level}`]: newPrefix,
      ...getCategories(remaining, level + 1, newPrefix)
    }
  }
}

const formattedData = data.map(format)

console.log(JSON.stringify(formattedData))
