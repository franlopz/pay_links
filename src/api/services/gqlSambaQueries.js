export const postBroadcastMessage = (msg) => {
  return `mutation M{postBroadcastMessage(message:"${msg}"){ message }}`
}

export const getTasks = ({ type, startDate, endDate }) => {
  return `query m{getTasks(taskType:"${type}",isCompleted:true,startDate:"${startDate}",endDate:"${endDate}") { id,startDate,customData { name value }}}`
}

export const refreshTicket = () => {
  return 'mutation m{postTicketRefreshMessage(id:0){id}}'
}

export const getTicket = (tid) => {
  return `query {getTicket(id:${tid}){id,type,date,entities{type,name},orders{date,portion,name,quantity,price,priceTag,tags{tag,price,rate,tagName},states{stateName,state,stateValue}},tags{tagName,tag},calculations{name,calculationAmount},totalAmount,states{stateName,state}}}`
}

export const updateTask = ({ id, name, value }) => {
  return `mutation m{updateTask(id:${id},task:{customData:[{name:"${name}",value:"${value}"}]}){id}}`
}
