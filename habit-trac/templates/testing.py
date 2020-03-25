def _2spaces(habit_):
    words= habit_.split('_')
    habitspaces=''
    for i in words:
        if (i==words[0]):
            habitspaces=habitspaces + i
        else:
            habitspaces=habitspaces + ' '+ i
    return(habitspaces)
    
yes='asdaasd_asdasd_ASdaa_asda'
no=_2spaces(yes)
print(no)